const mongoose=require("mongoose");
const StoreSchema=new mongoose.Schema({
    storeName: {
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    upvote:{
        type:Number,
        default:0
    },
    downvote:{
        type:Number,
        default:0
    },
    updatedBy:{
        type:String,
        required:true
    }
},{ timestamps: true })
module.exports= mongoose.model("Store",StoreSchema);