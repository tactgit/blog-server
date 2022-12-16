// node_modules
const router = require("express").Router();

// sub routes
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");
const categoryRoute = require("./category.route");
const uploadRoute = require("./upload.route");

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/categories", categoryRoute);
router.use("/upload", uploadRoute);

module.exports = router;
