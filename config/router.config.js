const express = require("express");
const router = express.Router();
const Posts = require("../controllers/posts.controller");

router.post("/posts", Posts.create);
router.get("/posts", Posts.list);
router.get("/posts/:id", Posts.details);
router.patch("/posts/:id", Posts.update);
router.delete("/posts/:id", Posts.delete);

module.exports = router;