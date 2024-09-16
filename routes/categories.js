const express = require("express");
const router = express.Router();
const { CreateCat, GetallCat, UpdatedCat, DeleteCat } = require("../controllers/categoriesCtl");

router.route("/").post(CreateCat).get(GetallCat);
router.route("/:id").put(UpdatedCat).delete(DeleteCat);

module.exports = router;
