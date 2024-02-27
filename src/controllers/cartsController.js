const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const cartsFilePath = './src/data/carts.json';

exports.createCart = (req, res) => {
    const newCart = {
        id: uuidv4(),
        products: []
    };
    const cartsData = fs.readFileSync(cartsFilePath);
    const carts = JSON.parse(cartsData);
    carts.push(newCart);
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
};

exports.getCartById = (req, res) => {
    const { cid } = req.params;
    const cartsData = fs.readFileSync(cartsFilePath);
    const carts = JSON.parse(cartsData);
    const cart = carts.find(c => c.id === cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
};

exports.addProductToCart = (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartsData = fs.readFileSync(cartsFilePath);
    let carts = JSON.parse(cartsData);
    const cartIndex = carts.findIndex(c => c.id === cid);
    if (cartIndex !== -1) {
        const productToAdd = { id: pid, quantity };
        const existingProductIndex = carts[cartIndex].products.findIndex(p => p.id === pid);
        if (existingProductIndex !== -1) {
            carts[cartIndex].products[existingProductIndex].quantity += quantity;
        } else {
            carts[cartIndex].products.push(productToAdd);
        }
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
        res.status(201).json(carts[cartIndex]);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
};
