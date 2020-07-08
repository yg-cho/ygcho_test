//1
const express = require("express");
const router = express.Router();

const checkAuth = require("../config/check-auth");

const {
    user_post_register_user,
    user_post_login_user,
    user_get_detail_user
} = require("../controllers/user");

//CRUD
//회원가입 - post
router.post('/register', user_post_register_user);

//로그인 - post
    router.post('/login', user_post_login_user)

//현재 유저정보 - get
router.get('/', checkAuth, user_get_detail_user);

//2
module.exports = router;