import * as fs from 'fs';

class PagesDAO {
    private _pages: any;

    constructor() {
        // TODO: A supprimer quand MongoDB prêt
        this._pages = JSON.parse(fs.readFileSync('./data/pages.json', 'utf8'));
    }

    public getPages(cb): void {
        cb(this._pages);
    }

    private getPageById(): void {
    }
}

export {PagesDAO};
