const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/inventory', {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Create a new product
app.post('/products', async (req, res) => {
try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Get all products
app.get('/products', async (req, res) => {
try {
    const products = await Product.find();
    res.json(products);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Search for products by name
app.get('/products/search/:name', async (req, res) => {
try {
    const products = await Product.find({ name: new RegExp(req.params.name, 'i') });
    res.json(products);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Serve static files
app.use(express.static('public'));
