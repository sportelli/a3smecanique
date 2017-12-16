import * as express from 'express';
import * as path from 'path';
// import * as pagesDAO from './dao/PagesDAO';
import {PagesDAO} from "./dao/PagesDAO";


class App {
    public express;
    private pagesDAO;

    constructor() {
        this.express = express();
        this.pagesDAO = new PagesDAO();
        this.mountRoutes();
    }
    private mountRoutes(): void {
        const router = express.Router();
        this.pagesDAO.pages.forEach(element => {
            router.get('/' + element.id, (req, res) => {
                res.render("page", {"page": element, "pages": this.pagesDAO.pages});
            });
        });
        this.express.use('/', router);
        this.express.use(express.static(path.join(__dirname, '../static')));
        this.express.set('views', path.join(__dirname, '../views'));
        this.express.set('view engine', 'pug');
    }
}

// export default new App().express;
export {App};
