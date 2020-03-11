const db = require('./conn');

class MainModel {
    constructor(id, name, location){
        this.id = id;
        this.name = name;
        this.location = location;
    }

    static async getAllCompanies(){
        try {
            const response = await db.any(`SELECT * FROM test_companies;`);
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
}

module.exports = MainModel;