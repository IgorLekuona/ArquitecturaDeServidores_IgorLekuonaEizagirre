const express = require("express");
const router = express.Router();

const users = require("../controllers/users.controller");

router.post("/employees", users.create);

router.get("/employees", users.list);

router.get("/employees/oldest", users.oldest);

router.get("/employees/:name", users.employeeByName);

module.exports = router;