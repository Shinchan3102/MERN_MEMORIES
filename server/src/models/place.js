const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    img:String,
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    },
    createdAt:{
        type: Date,
        default:new Date()
    }
});

const User=mongoose.model('User',userSchema);

module.exports= User;