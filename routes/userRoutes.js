const express=require("express")
const auth = require("../middleware/authMiddleware.js");
const { getUser,updateProfile} = require("../controllers/userController.js")
const router=express.Router()

router.get("/me",auth,getUser)
router.patch("/me",auth,updateProfile)

module.exports=router