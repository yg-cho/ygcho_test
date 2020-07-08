
const orderModel = require("../model/order");

exports.orders_get_total_order = (req, res) => {
    orderModel
        .find()
        // 연결된 product의 name과 price를 한번에 출력
        //.populate("product", "name price")
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        date:{
                            createdAt: doc.createdAt,
                            updatedAt: doc.updatedAt
                        },
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
};

exports.orders_get_detail_order = (req, res) => {
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
                        quantity: doc.quantity,
                        date: {
                            createdAt: doc.createdAt,
                            updatedAt: doc.updatedAt
                        },
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
};


exports.orders_post_register = (req,res) => {
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
                    quantity: order.quantity,
                    date: {
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt
                    },
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
};

exports.orders_update_order = (req,res) => {
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
};

exports.orders_delete_order = (req, res) => {
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
};


exports.orders_delete_all_order = (req, res) => {
    orderModel
        .delete()
        .then()
        .catch(err => {
            res.json({
                error: err.message
            });
        });
};