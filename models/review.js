const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const ReviewSchema= new Schema({
    carOwnerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    shopId:{
        type:Schema.Types.ObjectId,
        ref:"Shop",
        required: true
    },
    bookingId:{
        type:Schema.Types.ObjectId,
        ref:"Booking",
        required: true
    },
    rating:{
        type:Number,
         required: true,
         min: 1,
         max: 5
    },
    comment:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Review= mongoose.model("Review",ReviewSchema)
module.exports = Review




