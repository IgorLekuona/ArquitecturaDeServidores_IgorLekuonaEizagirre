const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

dotenv.config();

const saltRounds = process.env.SALT;

module.exports.create = (req, res) => {
    bcrypt.hash(req.body.password, parseInt(saltRounds))
        .then((hash) => {
            req.body.password = hash;
            User.create(req.body)
                .then((user) => {
                    res.status(201).json(user);
                })
                .catch((err) => {
                    res.status(400).json({message : "Error al crear el user"});
                });
        });
}
module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((match) => {
                        if (match) {
                            let token = jwt.sign(
                                { sub: user._id, exp: Date.now() / 1000 + 3600 },
                                process.env.JWT_SECRET
                            );
                            res.status(201).json({token : token});
                        } else {
                            res.status(401).json({message : "Password incorrecto"});
                        }
                    });
            } else {
                res.send(400).json({message : "User no encontrado"});
            }
        });
}