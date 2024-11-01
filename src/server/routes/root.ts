import express from 'express'; // need to do it the ES6 way to avoid false errors with typescript
import db from '../db/connection';

const router = express.Router();

router.get('/', (request, response) => {
  response.render('root', { name: 'bro' });
  // response.render tells application to find our template named "root"
});

router.get('/test-insert', async (req, res) => {
  await db.any(`INSERT INTO test_table ("test_string") VALUES ($1)`, [`Hello on ${new Date().toLocaleString}`]);
});

// router.get("/create-table", (req, res) => {
//   db.any(`CREATE TABLE table_name (
//     column1 datatype,
//     column2 datatype,
//     column3 datatype);`, [])
// });

router.post('/', (request, response) => {
  response.send('Hello world');
});

export default router;
