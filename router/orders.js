//1
const express = require("express");
const router = express.Router();
const checkAuth = require("../config/check-auth");

const {
    orders_get_total_order,
    orders_get_detail_order,
    orders_post_register,
    orders_update_order,
    orders_delete_order,
    orders_delete_all_order
} = require("../controllers/orders");


// order get
router.get('/', checkAuth, orders_get_total_order);

//order 상세데이터 불러오는 api
router.get('/:orderId', checkAuth, orders_get_detail_order);

// order post
router.post('/', checkAuth, orders_post_register);

// order patch(update)
router.patch('/:orderId', checkAuth, orders_update_order);

// order 개별 삭제
router.delete('/:orderId', checkAuth, orders_delete_order);

//all delete order
router.delete("/", checkAuth, orders_delete_all_order);

//2
module.exports = router;
