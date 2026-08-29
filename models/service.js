const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const ServiceSchema= new Schema({
    shopId:{
        type:Schema.Types.ObjectId,
        ref:"Shop",
        required: true
    },
    name:{
        type:String,
        required: true
    },
    price:{
         type:Number,
         required: true
    },
    duration:{
        type:Number
    }
})

const Service= mongoose.model("Service",ServiceSchema)
module.exports = Service




