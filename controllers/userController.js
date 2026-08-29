const User=require("../models/user.js")

async function getUser(req, res) {
    try {

        const user = await User.findById(req.user.id).select("-password")
        res.status(200).json(user)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function updateProfile(req,res) {
    try {
        const {name,phone}=req.body
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        const updatedProfile = await User.findByIdAndUpdate(
            req.user.id,
            { name,phone },
            { new: true }
        ).select("-password")

        res.status(200).json(updatedProfile)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports={getUser,updateProfile}