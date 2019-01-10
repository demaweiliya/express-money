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

//添加数据
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

//get api/profiles
router.get("/",passport.authenticate("jwt",{session:false}),(req, res) => {
    Profile.find().then((profile) => {
        if(!profile){
            return res.status(404).json('没有任何内容！')
        }

        return res.json(profile)
    }).catch((err) => console.log(err));
})


//获取单个信息 get api/profiles/:id

router.get("/:id",passport.authenticate("jwt",{session:false}),(req, res) => {
    Profile.findOne({_id:req.params.id}).then((profile) => {
        if(!profile){
            return res.status(404).json('没有任何内容！')
        }

        return res.json(profile)
    }).catch((err) => console.log(err));
})


//编辑数据
//post api/profiles/edit
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;
console.log('profileFields',profileFields);

    Profile.findOneAndUpdate({_id: req.params.id},{$set:profileFields},{new:true}).then((profile) => {
        res.json(profile)
    })
})

//删除数据 delete
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req, res) => {
  Profile.findOneAndRemove({_id:req.params.id}).then(profile=>{
      profile.save().then(profile=>{
          res.json(profile)
      })
  })
})

module.exports = router;