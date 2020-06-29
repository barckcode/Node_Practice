const express = require("express");
const router = express.Router();

// Data:
const productMoks = require('../../utils/moks/products')

router.get('/', function(req, res) {
  const { query } = req.query;

  res.status(200).json({
    // productMoks : Datos JSON hardcodeados.
    data: productMoks,
    message: 'products listed'
  });
});

router.get('/:productId', function(req, res) {
  const { productId } = req.params;

  res.status(200).json({
    data: productMoks[0],
    message: 'product retrieved'
  });
});

router.post('/', function(req, res) {

  res.status(201).json({
    data: productMoks[0],
    message: 'products listed'
  });
});

router.put('/:productId', function(req, res) {

  res.status(200).json({
    data: productMoks,
    message: 'products updated'
  });
});

router.delete('/', function(req, res) {
  res.status(200).json({
    data: productMoks[0],
    message: 'products deleted'
  });
});

module.exports = router