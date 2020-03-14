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
    // This adds a new company, and a corresponding review...
//     async addCompany() {
//         try{
//             // first, add the company, and return the ID
//             const newCompany = await db.one (
//                 `INSERT INTO test_companies (name, location) VALUES ($1, $2) RETURNING id;`, 
//                 [this.name, this.location]
//                 );
//             console.log("newCompany", newCompany);
//             const companyId = newCompany.id;
//             const addReview = await db.one(`INSERT INTO test_reviews (company_id, interview_rating, whiteboarding_rating, job_offer, comments) VALUES ($1, $2, $3, $4) RETURNING id;`, 
//             [this.interview_rating, this.whiteboarding_rating, this.job_offer, this.comments]);
//             console.log("add Review is ", addReview);
//         } catch (error) {
//             console.log('ERROR ', error);
//         }
// }
    
// }

module.exports = CompanyModel;