const db = require('./conn');

class ReviewModel {
    constructor(id, user_id, company_id, interview_rating, whiteboarding_rating, job_offer, comments){
        this.id = id;
        this.user_id = user_id;
        this.company_id = company_id;
        this.interview_rating = interview_rating;
        this.whiteboarding_rating = whiteboarding_rating;
        this.job_offer = job_offer;
        this.comments = comments;

    }
    async addReview() {
        try{
            const response = await db.one (
                `INSERT INTO test_reviews (interview_rating, whiteboarding_rating, job_offer, comments) VALUES ($1, $2, $3, $4) RETURNING id;`, 
                [this.interview_rating, this.whiteboarding_rating, this.job_offer, this.comments]
                );
                return response;
        } catch (error) {
            console.log('ERROR ', error);
        }
    }
}


module.exports = ReviewModel;