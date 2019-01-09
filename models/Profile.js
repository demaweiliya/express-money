const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        reuqired:true
    },
    expend:{
        type:String,
        reuqired:true
    },
    cash:{
        type:String,
        reuqired:true
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },

})

module.exports = Profile = mongoose.model("profile",ProfileSchema);