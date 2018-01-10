import * as express from 'express';
import * as path from 'path';
import {PagesDAO} from "./dao/PagesDAO";
import {MachinesDAO} from './dao/MachinesDAO';
const config = require('../config.json');

class App {
    public express;
    private pagesDAO : PagesDAO;
    private machinesDAO : MachinesDAO;

    constructor() {
        this.express = express();
        this.pagesDAO = new PagesDAO();
        this.machinesDAO = new MachinesDAO();
        this.mountRoutes();
    }
    private mountRoutes(): void {
        const router = express.Router();
        const machinesDAO = this.machinesDAO;

        this.pagesDAO.getPages(function (err, data) {
            if (!err) {
                console.log(data.length + " menus");
                if (data !== null) {
                    data.forEach(element => {
                        if ((element.type !== "menu")) {
                            router.get('/' + element.id, (req, res) => {
                                if (element.type === "machines") {
                                    machinesDAO.getMachines(function (errMachines, machines) {
                                        if (!errMachines) {
                                            res.render("page", {"page": element, "pages": data, "config": config, "machines": machines});
                                        }
                                    });
                                } else {
                                    res.render("page", {"page": element, "pages": data, "config": config});
                                }
                            });
                        } else if ((element.pages !== null) && (element.pages !== undefined)) {
                            element.pages.forEach(souspage => {
                                router.get('/' + souspage.id, (req, res) => {
                                    res.render("page", {"page": souspage, "pages": data, "config": config});
                                });
                            });
                        }
                    });
                }
            }
        });

        this.express.use('/', router);
        this.express.use(express.static(path.join(__dirname, '../static'), {maxage: '1d'}));
        this.express.set('views', path.join(__dirname, '../views'));
        this.express.set('view engine', 'pug');
    }
}

export {App};
