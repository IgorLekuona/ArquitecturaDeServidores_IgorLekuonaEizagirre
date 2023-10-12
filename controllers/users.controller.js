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
                    res.status(201).json({message : `Run this query to activate user : http://127.0.0.1:8000/api/activate/${user.id}`});
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
                if (user.active) {
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
                    res.status(401).json({message : "User no está activado!"});
                }
            } else {
                res.send(404).json({message : "User no encontrado"});
            }
        });
}
module.exports.activate = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {"active" : true}, {new: true, runValidators: true})
        .then((user) => {
            if (user) {
                if (user.active) {
                    res.status(200).json(user);
                } else {
                    res.status(401).json({message : "User no activo"});
                }
            } else {
                res.status(401).json({message : "User no encontrado"});
            }
        })
        .catch((err) => {
            res.status(400).json("Error al updatear el user");
        });
}