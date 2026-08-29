const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const BookingSchema= new Schema({
    carOwnerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    vehicleId:{
        type:Schema.Types.ObjectId,
        ref:"Vehicle",
        required: true
    },
    shopId:{
        type:Schema.Types.ObjectId,
        ref:"Shop",
        required: true
    },
    serviceId:{
        type:Schema.Types.ObjectId,
        ref:"Service",
        required: true
    },
    status:{
        type:String,
        enum:["pending","confirmed","completed","cancelled"],
        default: "pending",
        required: true
    },
    date:{
         type:Date,
         required: true
    },
    totalPrice:{
         type:Number,
         required: true
    },
    paymentStatus: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid",
    required: true
},
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Booking= mongoose.model("Booking",BookingSchema)
module.exports = Booking




