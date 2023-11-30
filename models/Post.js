const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    caption:{
        type:String,
        max:200,
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        require:true,

    },
    imageUrl:{
        type:String
    },
    like:{
        type:Array,
        default:[]
    },
    comment:{
        type:Array,
        default:[]
    },
    shared:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports = mongoose.model('Post',PostSchema)