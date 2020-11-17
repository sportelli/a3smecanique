const MongoClient = require('mongodb').MongoClient;


class DAO {
    protected db;

    public async getDb() {
        require('dotenv').config();
        try {
           return await (MongoClient.connect(process.env.MONGO_SERV));
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

