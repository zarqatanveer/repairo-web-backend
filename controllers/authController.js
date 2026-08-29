const bcrypt=require ("bcrypt");
const User=require("../models/user.js")
const jwt = require("jsonwebtoken");

async function registerUser(req,res){
   
    try{
    const {name,email,password,phone,role}=req.body
    const existingUser=await User.findOne({ email})
     if (existingUser) {
       return  res.status(400).json({message:"Email already registered"})
    }
    const newUser= await User.create({
    name,
    email,
    password,
    phone,
    role})
    res.status(201).json(newUser)
}
    catch(err){
        console.log(err)
         res.status(500).json({message:"something went wrong"})
    }
 }

 async function loginUser(req,res){
   
    try{
    const {email,password}=req.body
    const existingUser=await User.findOne({ email})
     if (!existingUser) {
       return res.status(401).json({ message: "invalid credentials" })
       
    }
    const result = await bcrypt.compare(password, existingUser.password);
    if (!result) 
       return res.status(401).json({ message: "invalid credentials" })

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ token, user: existingUser });
    }

    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
 }


module.exports={registerUser,loginUser}



