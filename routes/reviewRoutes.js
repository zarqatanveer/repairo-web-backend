const express=require("express")
const auth = require("../middleware/authMiddleware.js");
const { createReview,getAllReviews} = require("../controllers/reviewController.js")
const router=express.Router()

router.post ("/",auth,createReview)
router.get("/shop/:shopId",getAllReviews)

module.exports=router