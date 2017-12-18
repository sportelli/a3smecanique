const MongoClient = require('mongodb').MongoClient;

class DAO {
    protected db;

    public getDb(cb):any {
        MongoClient.connect(process.env.MONGO_SERV, function (err, db) {
            if (!err) {
                cb(err, db);
            } else {
                cb(err);
            }
        });
    }
}
export {DAO};
