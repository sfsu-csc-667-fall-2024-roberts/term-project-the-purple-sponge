import express from "express"; // need to do it the ES6 way to avoid false errors with typescript
const router = express.Router();

router.get("/", (request, response) => {
  response.render("root", { name: "bro" });
  // response.render tells application to find our template named "root"
});

router.post("/", (request, response) => {
  response.send("Hello world");
});

// important anything from './filename'
export default router;

// must destructure: import { router } from './filename'
// export { router };

// This is a different convention
// module.exports = router;
