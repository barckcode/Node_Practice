const express = require("express");
const router = express.Router();

// Data:
const productMoks = require('../utils/moks/products')

router.get("/", function(req, res) {
  res.render("products", { productMoks });
});


module.exports = router;