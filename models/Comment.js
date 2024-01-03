const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        max:200,
    },
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        require:true,

    },

},{timestamps:true})

module.exports = mongoose.model('Comment',CommentSchema)