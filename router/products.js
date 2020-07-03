
//1
const express = require("express");
const router = express.Router();

//module 불러오기

const productModel = require('../model/products')

// product get
router.get('/',(req,res) => {

    productModel
        .find()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:2222/product/"+doc._id
                        }
                    }
                })
            }
            res.json(response);
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
});

// product 상세데이터 불러오는 api

router.get('/:productId',(req, res) => {
    const id = req.params.productId;

    productModel
        .findById(id)
        .then(doc => {
            if(doc) {
                return res.json({
                    message : "Successful product detail get",
                    productinfo : {
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request : {
                            type: "GET",
                            url: "http://localhost:2222/product"
                        }
                    }
                });
            }else {
                res.json({
                    message : "no productId"
                });
            }
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
});


// product post
router.post('/',(req,res) => {
 const product = new productModel({
     name : req.body.productName,
     price : req.body.productPrice

    });
    res.json({
        message: 'product post',
        productInfo: product
    });
    product
        .save()
        .then(result => {
            res.json({
               message : "Registered product",
                createdProduct : {
                    id: result._id,
                    name: result.name,
                    price: result.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:2222/prodcut/"+result._id
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
});

// product patch
router.patch('/',(req,res) => {
    // update대상 선언
    const id = req.params.productId;

    // update 내용, 빈 배열을 만들어서 update할 값을 대입
   const updatedOps = {};
    for(const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }

    productModel
        //findByIdAndUpdate(id, update내용)
        .findByIdAndUpdate(id,{$set: updatedOps})
        .then(() => {
            res.json({
                message : "updated product",
                request : {
                    type: "GET",
                    url: "http://localhost:2222/product/"+id
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
});

// product delete
router.delete('/',(req,res) => {
   const id = req. param.productId;

   productModel
       .findByIdAndDelete(id)
       .then(() => {
           res.json({
               message: "Deleted product",
               request : {
                   type: "GET",
                   url: "http://localhost:2222/product"
               }
           });
       })
       .catch(err => {
           res.json({
              error : err.message
           });
       });
});



//2
module.exports = router;