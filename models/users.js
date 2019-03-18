const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        index: true
    },
    login: String,
    username: String,
    password: String,
    email: String
});

module.exports.Users = mongoose.model('Users', UsersSchema);
