const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Node Express server is up!");
});

const routes = require("./config/routes.config.js");
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Node Express server listening at ${port}`);
})