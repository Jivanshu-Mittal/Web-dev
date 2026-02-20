const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory product list (temporary database)
let products = [
    { id: 1, name: "Laptop", price: 1200, description: "High performance laptop" },
    { id: 2, name: "Phone", price: 800, description: "Latest smartphone" },
    { id: 3, name: "Headphones", price: 150, description: "Noise cancelling headphones" }
];

// GET all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

// CREATE product
app.post('/api/products', (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        description
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// UPDATE product
app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, description } = req.body;
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;

    res.json(product);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.json({ message: "Product deleted" });
});

// Simple products page
app.get('/products', (req, res) => {
    res.send(`
        <h1>Products</h1>
        <ul>
            ${products.map(p => `<li>${p.name} - $${p.price}</li>`).join('')}
        </ul>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
