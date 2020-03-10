const db = require('./conn');

class AlbumModel {
    constructor(id, name, band, category){
        this.id = id;
        this.name = name;
        this.band = band;
        this.category = category;
    }
    static async getAllAlbums(){
        try {
            const response = await db.any(`SELECT * FROM album;`);
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
    static async getById(entry){
        try {
            const response = await db.any(`SELECT * FROM album WHERE id = ${entry};`);
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
    static async getReviews(entry){
        try {
            const response = await db.any(`SELECT * FROM review WHERE album_id = ${entry};`);
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
    static async addReview(review_title, review_text, album_id) {
        try{
            const response = await db.one (
                `INSERT INTO review (users_id, title, review, album_id) VALUES ($1, $2, $3, $4) RETURNING id;`, 
                [1, review_title, review_text, album_id]
                );
                return response;
        } catch (error) {
            console.log('ERROR ', error);
        }
    }
}


module.exports = AlbumModel;