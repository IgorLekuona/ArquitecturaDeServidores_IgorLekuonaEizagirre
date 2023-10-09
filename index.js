const express = require("express");
const app = express();
const dotenv = require("dotenv");

require("./config/db.config");

app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;

const router = require("./config/router.config");
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});