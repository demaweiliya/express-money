//登录与注册逻辑
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User")
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')
//haha
//api/users/test
router.get('/test',(req,res) => {
    res.json({'msg':'login successed!!!'});
})

router.post('/register',(req,res)=>{
    //onsole.log('req',req.body);
    User.findOne({email:req.body.email}).then((user) => {
        if(user){
            return res.status(400).json({email:"邮箱已被注册!"})
        }else{
            //给一个默认的头像
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar:avatar,
                password:req.body.password
            })

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    if(err) throw err;

                    newUser.password = hash;

                    newUser.save().then((user)=>{
                                return res.json(user)
                            }).catch(err => console.log(err))

                });
            });


        }
    })
})


/**
 * $route Post api/users/login
 * @desc 返回token jwt passport
 * @access public
 */

 router.post("/login",(req,res) => {
     const email = req.body.email;
     const password = req.body.password;

console.log('email',email);

     User.findOne({email:email}).then((user)=>{
        console.log(user);
        
         
        if(!user){
            
            return res.status(404).json({email:"用户不存在!"});
        }

        //密码匹配
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                //规则 加密名 过期时间 回调
                const rule = {id:user.id,name:user.name}

                jwt.sign(rule,"secret",{expiresIn:3600},(err,token)=>{
                    if(err) throw err;
                    res.json({
                        success:true,
                        token:"Bearer " + token
                    })
                })
                //res.json({msg:"success"})
            }else{
                return res.status(400).json({password:"密码错误"})
            }
        })
     })
 })

//get 通过token来请求数据
//@access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
})


module.exports = router;