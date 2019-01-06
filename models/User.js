const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        reuqired:true
    },
    email:{
        type:String,
        reuqired:true
    },
    password:{
        type:String,
        reuqired:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = User = mongoose.model("users",UserSchema);