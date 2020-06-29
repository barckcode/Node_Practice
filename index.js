const path = require("path");
const express = require('express');
const app = express();

// Import Data Router:
const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');

app.use("/static" ,express.static(path.join(__dirname, "public")));

// Template Engine:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Router / Endpoints:
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

app.use(express.json());

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`)
})