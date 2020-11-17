import * as express from 'express';
import * as sitemap from 'sitemap';
import { json, raw, text, urlencoded } from 'body-parser';
import * as request from 'request';
import * as path from 'path';
import { PagesDAO } from "./dao/PagesDAO";
import { MachinesDAO } from './dao/MachinesDAO';
import { EmailSender } from './utils/EmailSender';
const config = require('../config.json');

class App {
    public express;
    private pagesDAO: PagesDAO;
    private machinesDAO: MachinesDAO;

    constructor() {
        this.express = express();
        this.pagesDAO = new PagesDAO();
        this.machinesDAO = new MachinesDAO();
        this.mountRoutes();
    }
    private async mountRoutes(): Promise<void> {
        const router = express.Router();
        const machinesDAO = this.machinesDAO;
        const pagesDAO = this.pagesDAO;
        const sm = sitemap.createSitemap({
            hostname: "https://" + config.url,
            cacheTime: 600000
        });

        const data = await this.pagesDAO.getPages();
        console.log(data.length + " menus");
        data.forEach(element => {
            if ((element.type !== "menu")) {
                sm.add({ url: '/' + element.id });
                router.get('/' + element.id, async (req, res) => {
                    if (element.type === "machines") {
                        try {
                            const machines = await machinesDAO.getMachines();
                            return res.render("page", { "page": element, "pages": data, "config": config, "machines": machines });
                        }
                        catch (err) {
                            throw new Error("Impossible d'afficher la page machines" + err);
                        }

                    } else {
                        try {
                            const toto = await pagesDAO.getPagesId(element._id)
                            return res.render("page", { "page": toto[0], "pages": data, "config": config });
                        }
                        catch (err) {
                            throw new Error("Impossible d'afficher la page actuelle" + err);
                        }


                    }
                });
            } else if ((element.pages !== null) && (element.pages !== undefined)) {
                element.pages.forEach(async souspage => {
                    sm.add({ url: '/' + souspage.id });
                    router.get('/' + souspage.id, async (req, res) => {
                        try {
                            const idSousPage = await pagesDAO.getSousPage(element.id, souspage.id);
                            return res.render("page", { "page": idSousPage, "pages": data, "config": config });
                        }
                        catch (err) {
                            throw new Error("Impossible de charger la sous pages" + err);
                        }
                    });
                });
            }
        });




        this.express.use(json());
        this.express.use(raw());
        this.express.use(text());
        this.express.use(urlencoded({ extended: true }));

        this.express.use('/', router);

        router.post('/contact_sent', (req, res) => {
            const secretKey = config.recaptcha_private_key;
            const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" +
                secretKey + "&response=" + req.body['g-recaptcha-response'] +
                "&remoteip=" + req.connection.remoteAddress;

            request(verificationUrl, function (error, response, body) {
                const b = JSON.parse(body);
                if (b.success !== undefined && !b.success) {
                    return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
                } else {
                    const htmlContent = "Email de " + req.body.name + "<br />" + "Email: " + req.body.email +
                        "<br />" + "Tel: " + req.body.tel +
                        "<br />" + "Message: " + req.body.message;
                    const d = { "content": htmlContent, subject: "Nouveau message de " + b.name };
                    new EmailSender().send(d, config);
                    res.json({ "responseCode": 0, "responseDesc": "Success" });
                }
            });

        });


        function setCustomCacheControl(_res) {
            _res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
        }

        this.express.use(express.static(path.join(__dirname, '../static'),
            {
                "maxAge": '1d',
                "setHeaders": setCustomCacheControl
            }));
        this.express.set('views', path.join(__dirname, '../views'));
        this.express.set('view engine', 'pug');
        this.express.set('view cache', true);

        router.get('/sitemap.xml', function (req, res) {
            res.setHeader('Content-Type', 'application/xml');
            res.send(sm.toString());
        });
    }
}

export { App };
