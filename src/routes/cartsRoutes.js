const express = require('express');
const cartsController = require('../controllers/cartsController');

const router = express.Router();

router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart);
router.put('/:cid', cartsController.updateCart);
router.put('/:cid/products/:pid', cartsController.updateProductQuantityInCart);
router.delete('/:cid', cartsController.deleteAllProductsFromCart);

module.exports = router;

