const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewsSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        index: true
    },
    review: String,
    userId: Number,
    productId: Number
});

module.exports.Reviews = mongoose.model('Reviews', ReviewsSchema);
