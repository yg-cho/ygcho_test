

const express = require("express");
const app = express();

const morgan = require("morgan");

const bodyParser = require("body-parser");


const mongoose = require("mongoose");
//
// app.use((req,res) => {
//     res.json({
//       data : 'OK'
//     });
// });

const productRoute = require("./router/products");
const orderRoute = require("./router/orders");

//database 연결
const db = "mongodb+srv://root:12345@cluster0-fe4rr.mongodb.net/shoppingmall?retryWrites=true&w=majority";

//promise
mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err.message));

//middleware setting
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route setting
app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = 2222;

app.listen(PORT, console.log("test server started!"));