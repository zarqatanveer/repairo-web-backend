const express=require("express")
const auth = require("../middleware/authMiddleware.js");
const { createShop,getMyShops,getAllShops,getShop,updateShop} = require("../controllers/shopController.js")
const router=express.Router()

router.post ("/",auth,createShop)
router.get("/mine",auth,getMyShops)
router.get("/",getAllShops)
router.get("/:id",getShop)
router.patch("/:id", auth, updateShop)

module.exports=router