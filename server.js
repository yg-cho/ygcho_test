

const express = require("express");
const app = express();

//
// app.use((req,res) => {
//     res.json({
//       data : 'OK'
//     });
// });

const productRoute = require("./router/product")


app.use("/product", productRoute);


const PORT = 2222;

app.listen(PORT, console.log("test server started!"));