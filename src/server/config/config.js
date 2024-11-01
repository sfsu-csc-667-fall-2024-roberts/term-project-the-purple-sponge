const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') }); // use .env inside the config folder
module.exports = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL
};
