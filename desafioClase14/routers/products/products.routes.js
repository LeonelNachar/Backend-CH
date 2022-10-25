const express = require('express');
const ApiProductos = require('../../api/productos');
const nProducts = new ApiProductos;

const router = express.Router();

router.get('/', nProducts.getAll)
router.get('/:id', nProducts.getById)
router.post('/', nProducts.save);
router.put('/:id', nProducts.supdate)
router.delete('/:id', nProducts.del)

module.exports = router
