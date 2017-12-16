import * as fs from 'fs';

class PagesDAO {
    private _pages: any;

    constructor() {
        this._pages = JSON.parse(fs.readFileSync('./data/pages.json', 'utf8'));
    }

    get pages(): any {
        return this._pages;
    }

    private getPageById(): void {
    }
}

export {PagesDAO};
