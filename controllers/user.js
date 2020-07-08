
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.user_post_register_user = (req, res) => {
    // 등록여부(email) 유무체크
    userModel
        .findOne({ email })
        //.findOne({ username: req.body.username })
        .then(user => {
            if(user) {
                return res.json({
                    message : "email already used"
                });
            } else {
                // password 암호화
                bcrypt.hash(password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                        // 암호화 성공시 database에 저장
                        const user = new userModel({
                            username, email,
                            password: hash
                        });
                        user
                            .save()
                            .then(user => {
                                res.json({
                                    message: "Registered OK",
                                    userInfo: user
                                });
                            })
                            .catch(err => {
                                res.json({
                                    error: err.message
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
};

exports.user_post_login_user = (req, res) => {
    //email validation -> password check -> jsonwebtoken return
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.json({
                    message: "email not found"
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err || result === false) {
                        return res.json({
                            message: "password incorrect"
                        });
                    } else {
                        // login ok => return token
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id
                            },
                            process.env.SECRET_KEY,
                            { expiresIn : "1h" }
                        );
                        res.json({
                            message: "Auth successful",
                            tokenInfo : "bearer " +token
                        });
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
};

exports.user_get_detail_user = (req, res) => {
    res.json({
        message: "현재 유저정보"
    });
};