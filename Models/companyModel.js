const db = require('./conn');

class CompanyModel {
    constructor(id, name, location){
        this.id = id;
        this.name = name;
        this.location = location;
    }

    static async getCompanyInfo(value){
        try {
            const response = await db.any(`SELECT * FROM test_companies WHERE id=${value};`);
            console.log(value);
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
}

module.exports = CompanyModel;