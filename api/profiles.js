//获取信息接口
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();

const Profile = require("../models/Profile")

const passport = require('passport')
//haha
//router get api/profile.test
router.get('/test',(req,res) => {
    res.json({'msg':'profile successed!!!'});
})

//post api/profiles/add

router.post('/add',passport.authenticate("jwt",{session:false}),(req,res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then((profile)=>{
        res.json(profile);
    })
})

module.exports = router;