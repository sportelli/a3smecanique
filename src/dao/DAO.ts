const MongoClient = require('mongodb').MongoClient;


class DAO {
    protected db;

    public async getDb() {
        require('dotenv').config();
        try {
           const db = await MongoClient.connect(process.env.MONGO_SERV);
           console.log(db);
           return db.db('a3s');
        }
        catch (err) {
            console.log('il ya eu un problème' + err);
        }
    };
}

export { DAO };


// if (!err) {
//     cb(err, db);
// } else {
//     cb(err);
// }

