import {DAO} from './DAO';

class PagesDAO extends DAO {
    private _pages: any = null;

    constructor() {
        super();
    }
//recuperation de toutes les pages
    public getPages(cb): void {
        super.getDb(function (err, db) {
            if (!err) {
                db.collection('pages', function (err2, collection) {
                    if (!err) {
                        collection.find().sort({order: 1}).toArray(function (err3, pages) {
                            cb(null, pages);
                        });
                    } else {
                        cb(err);
                    }
                });
            }
        });
    }

    //recuperer une page avec id
    public getPagesId(_id, cb): void {
        super.getDb(function (err, db) {
            if (!err) {
                db.collection('pages', function (err2, collection) {
                    if (!err) {
                        collection.find({"_id": _id}).toArray(function (err3, toto) {
                        cb(null, toto);
                        });
                    } else {
                        cb(err);
                    }
                });
            }
        });
    }
    
    //sosu page
    public getSousPage(pageId, sousPageId, cb): void {
        super.getDb(function (err, db) {
            if (!err) { 
                db.collection('pages', function (err2, collection) {
                    if (!err) {                                                                        
                        collection.find({"id": pageId}).toArray(function (err3, page) {
                        for(let i =0; i<page[0].pages.length; i++){
                            if (page[0].pages[i].id === sousPageId){
                                cb(null, page[0].pages[i]);
                            }
                        }
                       
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
