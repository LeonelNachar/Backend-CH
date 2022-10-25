const express = require('express');
const rProducts = require('./products/products.routes')
const rCart = require('./cart/cart.routes')

const router = express.Router();
router.use('/productos', rProducts)
router.use('/carrito', rCart)

module.exports = router;