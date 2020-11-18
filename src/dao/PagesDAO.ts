import { DAO } from './DAO';

class PagesDAO extends DAO {
    private _pages: any = null;

    constructor() {
        super();
    }
    // recuperation de toutes les pages
    public async getPages() {
        try {
            const db = await super.getDb();
            const collection = db.collection('pages');
            const pages = await collection.find().sort({ order: 1 }).toArray();
            return pages;
        } catch (err) {
            throw new Error("Impossible de récupérer les pages." + err);
        }
    }

    // recuperer une page avec id
    public async getPagesId(_id) {
        try {
            const db = await super.getDb();
            return db.collection('pages').find({ "_id": _id }).toArray();
        } catch (err) {
            throw new Error("Impossible de trouver la page" + err);
        }
    }

    // sosu page
    public async getSousPage(pageId, sousPageId) {
        try {
            const db = await super.getDb();
            const collection = db.collection('pages');
            const page = await collection.find({ "id": pageId }).toArray();

            for (let i = 0; i < page[0].pages.length; i++) {
                if (page[0].pages[i].id === sousPageId) {
                    return page[0].pages[i];
                }

            }

        } catch {
            throw new Error("Impossible de récupérer les sous pages.");
        }

    }
}
export { PagesDAO };
