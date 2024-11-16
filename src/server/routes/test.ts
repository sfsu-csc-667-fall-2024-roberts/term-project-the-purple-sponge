import express from "express";
import db from "../db/connection";

const router = express.Router();

// type TestRecord = {
//   id: number;
//   test_string: string;
// };

router.get("/test-insert", async (request, response) => {
  await db.any(`INSERT INTO test ("test_string") VALUES ($1)`, [
    `Hello on ${new Date().toLocaleString()}`,
  ]);
  const results = await db.any(`select * from test;`);
  response.json(results);
});

export default router;
