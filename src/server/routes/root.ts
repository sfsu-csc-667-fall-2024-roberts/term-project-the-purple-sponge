import express from "express";

const router = express.Router();

// type TestRecord = {
//   id: number;
//   test_string: string;
// };

router.get("/", (request, response) => {
  // response.render("root", { info: "blue"});
  if (request.session.user) {
    console.log(request.session.user.username);
    response.render("root", { info: "blue", session: request.session});
  }
  // response.render tells application to find our template named "root"
});

export default router;
