const Users = require("../models/user.model");

module.exports.create = (req, res) => {
    let result = Users.addEmployee(req.body);
    if (Array.isArray(result)) {
        res.json(result);
    } else {
        res.status(400).json({"code": "bad_request"});
    }
}

module.exports.list = (req, res) => {
    if (req.query.page) {
        let data = Users.getPaginatedEmployees(req.query.page);
        res.json(data);
    } else if (req.query.user) {
        let data = Users.getUserEmployees();
        res.json(data);
    } else if (req.query.badges) {
        let data = Users.getEmployeeByBadge(req.query.badges);
        res.json(data);
    } else {
        let data = Users.getAllEmployees();
        res.json(data);
    }
}

module.exports.oldest = (req, res) => {
    let data = Users.getOldestEmployee();
    res.json(data);
}

module.exports.employeeByName = (req, res) => {
    let data = Users.getEmployeeByName(Users.firstToUppercase(req.params.name));
    if (data.length === 0) {
        res.status(404).json({"code": "not_found"});
    } else {
        res.json(data);
    }
}