import express from "express"; // need to do it the ES6 way to avoid false errors with typescript
import db from "../db/connection";

const router = express.Router();

router.get("/createToken", (request, response) => {
  console.log("auth route called");
});

export default router;
