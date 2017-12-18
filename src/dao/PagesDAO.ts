import {DAO} from './DAO';

class PagesDAO extends DAO {
    private _pages: any = null;

    constructor() {
        super();
    }

    public getPages(cb): void {
        super.getDb(function (err, db) {
            if (!err) {
                db.collection('pages', function (err2, collection) {
                    if (!err) {
                        collection.find().toArray(function (err3, pages) {
                            cb(null, pages);
                        });
                    } else {
                        cb(err);
                    }
                });
            }
        });
    }
}

export {PagesDAO};
