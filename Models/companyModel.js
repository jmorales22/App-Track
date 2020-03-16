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

    async addCompany() {
        try{
            const response = await db.one (
                `INSERT INTO test_companies (name, location) VALUES ($1, $2) RETURNING id;`, 
                [this.name, this.location]
                );
                return response;
        } catch (error) {
            console.log('ERROR ', error);
        }
     }
    }

module.exports = CompanyModel;