import express from 'express'; // need to do it the ES6 way to avoid false errors with typescript
import db from '../db/connection';

const router = express.Router();

type TestRecord = {
  id: number;
  test_string: string;
};

router.get('/', (request, response) => {
  response.render('root', { info: 'blue' });
  // response.render tells application to find our template named "root"
});

router.get('/test-insert', async (request, response) => {
  await db.any(`INSERT INTO test_table ("test_string") VALUES ($1)`, [`Hello on ${new Date().toLocaleString()}`]);
  const results = await db.any<TestRecord>(`select * from test_table;`);
  response.json(results);
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
