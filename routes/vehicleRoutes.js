const express=require("express")
const auth = require("../middleware/authMiddleware.js");
const { createVehicle,getUserVehicles,getVehicleById,updateVehicle,deleteVehicle} = require("../controllers/vehicleController.js")
const router=express.Router()

router.post ("/",auth,createVehicle)
router.get("/mine", auth, getUserVehicles)
router.get("/:id", auth, getVehicleById)
router.patch("/:id", auth, updateVehicle)
router.delete("/:id", auth, deleteVehicle)

module.exports=router