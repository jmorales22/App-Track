const db = require('./conn');

class ReviewsModel {
    constructor(id, user_id, company_id, interview_rating, whiteboarding_rating, job_offer, comments){
        this.id = id;
        this.user_id = user_id;
        this.company_id = company_id;
        this.interview_rating = interview_rating;
        this.whiteboarding_rating = whiteboarding_rating;
        this.job_offer = job_offer;
        this.comments = comments;
    }

    static async getCompanyReviews(value){
        try {
            const response = await db.any(`
                SELECT * 
                FROM test_reviews 
                INNER JOIN test_companies
                ON test_reviews.company_id = test_companies.id
                WHERE test_companies.id=${value};`);
            console.log(value);
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
}

module.exports = ReviewsModel;