//1
const express = require("express");
const router = express.Router();

// order get
router.get('/total',(req, res) => {
    res.json({
        message : 'order total get'
    });
});

router.get('/',(req, res) => {
    res.json({
        message : 'order get'
    });
});

// order post
router.post('/',(req,res) => {
    const order ={
        orderNumber : req.body.orderNumber,
        orderDate : req.body.orderDate
    }
    res.json({
        message : 'order post(create)',
        orderInfo : order
    });
});

// order put
router.put('/',(req, res) => {
    res.json({
        message : 'order put(update)'
    });
});

// order delete
router.delete('/',(req, res) => {
    res.json({
        message : 'order delete'
    });
});
//2
module.exports = router;
