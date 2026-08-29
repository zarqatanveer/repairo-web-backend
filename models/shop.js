const mongoose=require("mongoose")
const Schema=mongoose.Schema

const ShopSchema=new Schema({
    ownerId:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Shop=mongoose.model("Shop",ShopSchema)
module.exports=Shop;