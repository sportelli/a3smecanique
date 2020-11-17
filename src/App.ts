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
    private mountRoutes(): void {
        const router = express.Router();
        const machinesDAO = this.machinesDAO;
        const pagesDAO = this.pagesDAO;
        const sm = sitemap.createSitemap({
            hostname: "https://" + config.url,
            cacheTime: 600000
        });

        this.pagesDAO.getPages(async function (err, data) {
            if (!err) {
                console.log(data.length + " menus");
                if (data !== null) {
                    data.forEach(element => {
                        if ((element.type !== "menu")) {
                            sm.add({ url: '/' + element.id });
                            router.get('/' + element.id, async (req, res) => {
                                if (element.type === "machines") {
                                    machinesDAO.getMachines(async function (errMachines, machines) {/*Machine est l'élement */
                                        if (!errMachines) {
                                            res.render("page", { "page": element, "pages": data, "config": config, "machines": machines });
                                        }
                                    });
                                } else {
                                    let toto = await pagesDAO.getPagesId(element._id)
                                    res.render("page", { "page": toto[0], "pages": data, "config": config });


                                }
                            });
                        } else if ((element.pages !== null) && (element.pages !== undefined)) {
                            element.pages.forEach(souspage => {
                                sm.add({ url: '/' + souspage.id });
                                router.get('/' + souspage.id, (req, res) => {
                                    pagesDAO.getSousPage(element.id, souspage.id, function (errPages, idSousPage) {
                                        if (!errPages) {
                                            res.render("page", { "page": idSousPage, "pages": data, "config": config });
                                        }
                                    })
                                });
                            });
                        }
                    });
                }
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
