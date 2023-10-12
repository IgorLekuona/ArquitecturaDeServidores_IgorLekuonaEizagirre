const Post = require("../models/post.model");
const User = require("../models/user.model");

module.exports.create = (req, res) => {
    Post.create({
        "title" : req.body.title,
        "text" : req.body.text,
        "author" : req.user
    })
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((err) => {
            res.status(400).json({message : "Error al crear el post"});
        });
}
module.exports.list = (req, res) => {
    Post.find().populate("author")
        .then((posts) => {
            res.json(posts);
        });
}
module.exports.details = (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(404).json("El post no existe en la memoria");
        });
}
module.exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then((post) => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json("El post no existe en la memoria");
            }
        })
        .catch((err) => {
            res.status(400).json("Error al updatear el post");
        });
}
module.exports.delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            if (post) {
                res.status(204);
            } else {
                res.status(404).json({message : "El post no existe en la memoria"});
            }
        });
}