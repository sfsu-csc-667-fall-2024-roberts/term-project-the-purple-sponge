import pgb from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

// this code should only be executed once
const pgbInstance = pgb();
console.log('process env in connection.ts is:', process.env.DATABASE_URL);
const connection = pgbInstance(process.env.DATABASE_URL!); // assert it is a string

export default connection; // export the database
