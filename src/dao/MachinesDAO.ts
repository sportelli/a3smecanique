import {DAO} from './DAO';

class MachinesDAO extends DAO {
    private _pages: any = null;

    constructor() {
        super();
    }

    public async getMachines(): Promise<void> {
        try {
            const db = await super.getDb();
            return await db.collection('machines').find().sort({order: 1}).toArray()
        }
        catch(err){
            throw new Error("Impossible de récupérer les machines")
        }

    }
}

export {MachinesDAO};
