const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    rate: Number,
    price: Number,
    lastModifiedDate: {
        type: Date
    }
});

module.exports.Products = mongoose.model('Products', ProductsSchema);
