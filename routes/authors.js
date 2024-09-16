const express = require("express");
const router = express.Router();
const { CreateAuthor, GetallAuthors, UpdatedAuthor, DeleteAuthor } = require("../controllers/authorsCtl");

router.route("/").post(CreateAuthor).get(GetallAuthors);
router.route("/:id").put(UpdatedAuthor).delete(DeleteAuthor);

module.exports = router;
