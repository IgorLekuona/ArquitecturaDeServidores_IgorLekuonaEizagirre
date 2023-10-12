const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    title: {
        type: String,
        required: true,
        minLength: 6
    },
    text: {
        type: String,
        required: true,
        minLength: 6
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

const Post = mongoose.model("Post", schema);

module.exports = Post;