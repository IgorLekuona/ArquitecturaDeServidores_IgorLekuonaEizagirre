const fs = require("fs");
const Ajv = require("ajv");
const path = require("path");

var jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "./employees.json")));

const addEmployee = (data) => {
    const ajv = new Ajv();
    try {
        let schema = JSON.parse(fs.readFileSync(path.join(__dirname, "./schema.json")));
        let validate = ajv.compile(schema);
        let isValid = validate(data.employee);

        if (!isValid) {
            console.error(JSON.stringify(validate.errors, null, 2));
            return false;
        }

        jsonData.push(data.employee);
        console.log('Data successfully saved to JSON file');
        return getAllEmployees();
    } catch (error) {
        console.log('An error has occurred ', error);
        return error;
    }
}

const getAllEmployees = () => {
    return jsonData;
}

const getPaginatedEmployees = (page) => {
    let empPage = [jsonData[2*(page-1)], jsonData[2*(page-1)+1]];
    return empPage;
}

const getOldestEmployee = () => {
    let sorted = jsonData.sort((a,b) => a.age - b.age)
    return sorted[sorted.length -1];
}

const getUserEmployees = () => {
    let filtered = jsonData.filter(a => a.privileges === "user");
    return filtered;
}

const getEmployeeByBadge = (badge) => {
    let filtered = jsonData.filter(a => a.badges.includes(badge));
    return filtered;
}

const getEmployeeByName = (name) => {
    let filtered = jsonData.filter(a => a.name === name);
    return filtered;
}

const firstToUppercase = (word) => {
    let lower = word.toLowerCase();
    return (lower.charAt(0).toUpperCase() + lower.slice(1));
}

module.exports = { addEmployee, getAllEmployees, getPaginatedEmployees, getOldestEmployee, getUserEmployees, getEmployeeByBadge, getEmployeeByName, firstToUppercase }