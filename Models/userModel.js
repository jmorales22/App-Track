const db = require('./conn'),
bcrypt = require('bcryptjs');

class userModel {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
      }

    async addUser() {
        try {
        const response = await db.one (
          `INSERT INTO test_users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
          [this.first_name, this.last_name, this.email, this.password]
        );
  
        return response;
      } catch (error) {
        console.error('ERROR: ', error);
        return error;
      }
    }
    static async getById(entry){
      try {
        console.log('Jennifer, entry: ', entry);
          const response = await db.any('SELECT * FROM test_users WHERE id = $1;', [entry]);
          console.log('Jennifer, response', response);
          return response;
      } catch(error) {
          console.error('ERROR: ', error);
          return error;
      }
  }

  async loginUser() {
      try {
        const response = await db.one (
          `SELECT id, first_name, last_name, password FROM test_users WHERE email = $1;`,
          [this.email]
          );

          const isValid = this.checkPassword(response.password);

        if (!!isValid) {
          const { id, first_name, last_name } = response;
          return { isValid, user_id: id, first_name, last_name };
        } else {
          return { isValid };
        }
      } catch (error) {
        console.error('ERROR:', error);
        return error;
      }
    }
}

module.exports = userModel;
