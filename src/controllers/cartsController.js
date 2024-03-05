const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Cart = require('../models/carts.js');

exports.deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        cart.products.pull(pid);
        await cart.save();
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        res.json(cart);
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.updateProductQuantityInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        const product = cart.products.id(pid);
        if (!product) {
            return res.status(404).send('Producto no encontrado en el carrito');
        }
        product.quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.deleteAllProductsFromCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        cart.products = [];
        await cart.save();
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar todos los productos del carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
};

