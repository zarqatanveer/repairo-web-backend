const mongoose=require("mongoose")
const Schema = mongoose.Schema

const VehicleSchema= new Schema({
    ownerId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type:{
        type:String,
         required: true
    },
    color:{
        type:String
    },
    year:{
        type:Number
    },
    plateNumber:{
        type:String,
        required: true
    }
})

const Vehicle=mongoose.model("Vehicle",VehicleSchema);
module.exports=Vehicle;




