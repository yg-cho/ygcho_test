

const express = require("express");
const app = express();

const morgan = require("morgan");
//
// app.use((req,res) => {
//     res.json({
//       data : 'OK'
//     });
// });

const productRoute = require("./router/products");
const orderRoute = require("./router/orders");


//middleware setting
app.use(morgan('dev'));

//route setting
app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = 2222;

app.listen(PORT, console.log("test server started!"));