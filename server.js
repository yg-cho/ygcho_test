

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// database 연결
require("./config/database");

const productRoute = require("./router/products");
const orderRoute = require("./router/orders");
const userRoute = require("./router/user");

//middleware setting
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route setting
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("test server started!"));