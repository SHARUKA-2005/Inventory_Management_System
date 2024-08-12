const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
name: { type: String, required: true },
description: String,
supplier: String,
sales: Number,
price: { type: Number, required: true },
quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
