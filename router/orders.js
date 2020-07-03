//1
const express = require("express");
const router = express.Router();
const orderModel = require('../model/order');
// order get
router.get('/',(req, res) => {
    orderModel
        .find()
        .populate("product", "name price")
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                   return {
                        id: doc._id,
                        product: doc.product,
                        request: {
                            type: "GET",
                            url: "http://localhost:2222/order/" + doc._id
                        }
                    }
                })
            }
            res.json(response);
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
});

//order 상세데이터 불러오는 api

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId;

    orderModel
        .findById(id)
        .populate("product","name price")
        .then(doc => {
            if(doc){
                return res.json({
                    message: "Successful order detail get",
                    orderInfo: {
                        id: doc._id,
                        product: doc.product,
                        quntity: doc.quntity,
                        request: {
                            type: "GET",
                            url: "http://localhost:2222/order"
                        }
                    }
                });
            }else {
                res.json({
                    message: "no orderId"
                });
            }
        })
        .catch(err=> {
            res.json({
                error: err.message
            });
        });
})



// order post
router.post('/',(req,res) => {
    const order = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    });

    order
        .save()
        .then(result => {
            res.json({
                message: "Successful order stored",
                orderInfo: {
                    id: order._id,
                    product: order.product,
                    quntity: order.quntity,
                    request: {
                        type: "GET",
                        url: "http://localhost:2222/order/"+order._id
                    }
                }
            });
        })
        .catch(err =>{
            res.json({
                error: err.message
            });
        });
});

// order patch(update)

router.patch('/:orderId',(req,res) => {
    //대상
    const id = req.params.orderId;

    //내용
    const updatedOps = {};
    for(const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }

    orderModel
        .findByIdAndUpdate(id,{ $set: updatedOps })
        .then(() => {
            res.json({
                message: "updated order",
                request: {
                    type: "GET",
                    url: "http://localhost:2222/order/"+id
                }
            });
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
})

// order 개별 삭제
router.delete('/orderId',(req, res) => {
    const id = req.params.orderId;

    orderModel
        .findByIdAndDelete(id)
        .then(() => {
            res.json({
                message: "Deleted order",
                request: {
                    type: "GET",
                    url: "http://localhost:2222/order"
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
});

//all delete order
router.delete("/",(req, res) => {
    orderModel
        .delete()
        .then()
        .catch(err => {
            res.json({
                error: err.message
            });
        });
});
//2
module.exports = router;
