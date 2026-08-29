const mongoose=require ("mongoose");
const bcrypt=require ("bcrypt");
const Schema =mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
    },
    phone:{
        type: String
    },
    role:{
        type: String,
        required:true,
        enum:["customer","shopOwner"]
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User=mongoose.model("User",UserSchema)
module.exports =User;