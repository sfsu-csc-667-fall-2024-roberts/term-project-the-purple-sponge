import express from "express";

const router = express.Router();

// type TestRecord = {
//   id: number;
//   test_string: string;
// };

router.get("/", (request, response) => {
  response.render("root", {
    title: "Welcome to the home page!",
    flashMessagesSuccess: request.flash("success"),
  });
  // response.render tells application to find our template named "root"
});

export default router;
