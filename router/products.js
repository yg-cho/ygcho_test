
//1
const express = require("express");
const router = express.Router();


// product get
router.get('/total',(req,res) =>{
    res.json({
        message : 'product total get'
    });
});

router.get('/',(req,res) => {

    res.json({
        message : 'product get',
    });
});

// product post
router.post('/',(req,res) => {
    const product = {
        name : req.body.productName,
        price : req.body.productPrice
    }
    res.json({
        message : 'product post',
        productInfo : product
    });
});

// product put
router.put('/',(req,res) => {
    res.json({
        message : 'product put'
    });
});

// product delete
router.delete('/',(req,res) => {
    res.json({
        message : 'product delete'
    });
});



//2
module.exports = router;