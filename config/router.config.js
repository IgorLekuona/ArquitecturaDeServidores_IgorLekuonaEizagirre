const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/secure.middleware");
const Users = require("../controllers/users.controller");
const Posts = require("../controllers/posts.controller");

router.post("/users", Users.create);
router.post("/login", Users.login);
router.get("/activate/:id", Users.activate);

router.post("/posts", middleware.checkAuth, Posts.create);
router.get("/posts", middleware.checkAuth, Posts.list);
router.get("/posts/:id", middleware.checkAuth, Posts.details);
router.patch("/posts/:id", middleware.checkAuth, Posts.update);
router.delete("/posts/:id", middleware.checkAuth, Posts.delete);

module.exports = router;