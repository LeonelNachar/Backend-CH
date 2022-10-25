const express = require('express');
const Cart = require('../../api/cart');
const nCart = new Cart();

const router = express.Router();

router.get('/', nCart.getAll);
router.get('/:id', nCart.getById);
router.post('/', nCart.save);
router.post('/:IdCar/:IdProd', nCart.supdate);
router.delete('/:IdCart/:IdProd', nCart.del);
module.exports = router;