const path = require("path");
const express = require('express');

// Import Data Router:
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

// Inicialize app
const app = express();

// Middlewares
app.use(express.json());


// Static Files:
app.use("/static" ,express.static(path.join(__dirname, "public")));

// Template Engine:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Router / Endpoints:
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// Redirect
app.get('/', function(req, res) {
  res.redirect('/products')
})

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`)
})