// node_modules
const router = require("express").Router();

// controllers
const { categoryController } = require("../controllers");

// utils
const { checkAuth } = require("../utils");

router.post("/category", checkAuth, categoryController.createCategory);
router.get("/categories", checkAuth, categoryController.readCategories);
router.get("/category/:id", checkAuth, categoryController.readCategory);
router.put("/category/:id", checkAuth, categoryController.updateCategory);
router.delete("/category/:id", checkAuth, categoryController.deleteCategory);
router.get("/vote/:id", checkAuth, categoryController.increaseVote);

module.exports = router;
