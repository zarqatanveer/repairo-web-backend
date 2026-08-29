const express=require("express")
const auth = require("../middleware/authMiddleware.js");
const { addService,showServices,getServiceById,updateService, deleteService} = require("../controllers/serviceController.js")
const router=express.Router()

router.post ("/",auth,addService)
router.get("/shop/:shopId",showServices)
router.get("/:id", auth, getServiceById)
router.patch("/:id",auth,updateService)
router.delete("/:id", auth, deleteService)

module.exports=router