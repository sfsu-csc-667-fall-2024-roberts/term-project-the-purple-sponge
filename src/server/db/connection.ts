import pgb from 'pg-promise';
const dotenv = require('../config/config');

// dotenv.config();
// this code should only be executed once
const pgbInstance = pgb();
console.log('process env in connection.ts is:', dotenv.DATABASE_URL);
const connection = pgbInstance(dotenv.DATABASE_URL!); // assert it is a string

export default connection; // export the database
