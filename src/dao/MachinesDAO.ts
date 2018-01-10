import {DAO} from './DAO';

class MachinesDAO extends DAO {
    private _pages: any = null;

    constructor() {
        super();
    }

    public getMachines(cb): void {
        super.getDb(function (err, db) {
            if (!err) {
                db.collection('machines', function (err2, collection) {
                    if (!err) {
                        collection.find().sort({order: 1}).toArray(function (err3, machines) {
                            cb(null, machines);
                        });
                    } else {
                        cb(err);
                    }
                });
            }
        });
    }
}

export {MachinesDAO};
