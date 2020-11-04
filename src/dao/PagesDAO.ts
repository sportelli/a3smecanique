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
    public getPagesId(_id, cb): void {                                                                         //classe
        super.getDb(function (err, db) {                                                                  // classe parent DAO 
            if (!err) {                                                                                  //si pas d'erreur alors 
                db.collection('pages', function (err2, collection) {                                    //on selectionne la collection pages dans mongo
                    if (!err) {                                                                        // si pas d'erreur alors 
                        collection.find({"_id": _id}).toArray(function (err3, toto) {
                            console.log(toto)                                                  //on va chercher dans notre collection pages l'id des pages et le renvoyer dans le tableau    
                        cb(null, toto);                                                   // stocker notre tableau dans la callback (cb) en prennant le premier element dans notre tableau {0}
                        });
                    } else {
                        cb(err);                                                       // si il ya une erreur alors notre callback (cb) nous renvera une erreur lorsque l'on appel notre callback
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
                        console.log(sousPageId);
                        for(let i =0; i<page[0].pages.length; i++){
                            if (page[0].pages[i].id === sousPageId){
                                console.log("**");
                                console.log(page[0].pages[i]);
                                console.log("**");
                                cb(null, page[0].pages[i]);
                            }
                        }
                        /*console.log("==");
                        console.log(page[0]);
                        console.log(page[0].pages.length)  
                        console.log("==");
                        //page est un array 
                        // on a besoin d'aller recuperer l'élément 0, juste besoin d'une sous page
                        //console.log(page[0]) 
                        console.log(sousPageId)*/
                       
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
