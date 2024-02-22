const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const productsFilePath = '../src/data/products.json';

exports.getAllProducts = (req, res) => {
    const productsData = fs.readFileSync(productsFilePath);
    const products = JSON.parse(productsData);
    res.json(products);
};

exports.getProductById = (req, res) => {
    const { pid } = req.params;
    const productsData = fs.readFileSync(productsFilePath);
    const products = JSON.parse(productsData);
    const product = products.find(p => p.id === pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
};

exports.addProduct = (req, res) => {
    const newProduct = req.body;
    newProduct.id = uuidv4();
    const productsData = fs.readFileSync(productsFilePath);
    const products = JSON.parse(productsData);
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const { pid } = req.params;
    const updatedProduct = req.body;
    const productsData = fs.readFileSync(productsFilePath);
    let products = JSON.parse(productsData);
    const index = products.findIndex(p => p.id === pid);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.json(products[index]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
};

exports.deleteProduct = (req, res) => {
    const { pid } = req.params;
    let productsData = fs.readFileSync(productsFilePath);
    let products = JSON.parse(productsData);
    products = products.filter(p => p.id !== pid);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.sendStatus(204);
};
