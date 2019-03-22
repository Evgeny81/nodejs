const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitiesSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    country: String,
    capital: {
        type: Boolean,
        required: true
    },
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: {
        type: Date
    }
});

module.exports.Cities = mongoose.model('Cities', CitiesSchema);
