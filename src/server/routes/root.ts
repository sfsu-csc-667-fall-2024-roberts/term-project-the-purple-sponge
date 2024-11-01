import express from 'express'; // need to do it the ES6 way to avoid false errors with typescript
import db from '../db/connection';
import { request } from 'http';

const router = express.Router();

type TestRecord = {
  id: number;
  test_string: string;
};

router.get('/', (request, response) => {
  response.render('root', { info: 'blue' });
  // response.render tells application to find our template named "root"
});

router.get('/landingpageunauth', (request, response) => {
  response.render('landing_page_unauth');
});

router.get('/landingpageauth', (request, response) => {
  response.render('landing_page_auth');
});

router.get('/login', (request, response) => {
  response.render('login_page');
});

router.get('/signup', (request, response) => {
  response.render('signup_page');
});

router.get('/test-insert', async (request, response) => {
  await db.any(`INSERT INTO test_table ("test_string") VALUES ($1)`, [`Hello on ${new Date().toLocaleString()}`]);
  const results = await db.any<TestRecord>(`select * from test_table;`);
  response.json(results);
});

export default router;
