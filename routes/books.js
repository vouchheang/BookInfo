const express = require("express");
const router = express.Router();
const { CreateBook, GetallBooks, UpdatedBook, DeleteBook} = require("../controllers/booksCtl");

router.route("/").post(CreateBook).get(GetallBooks);
router.route("/:id").put(UpdatedBook).delete(DeleteBook);

module.exports = router;
