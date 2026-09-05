const express=require("express")
const auth = require("../middleware/authMiddleware.js");
const { createBooking,getBookingsByCustomer,getBookingsForShop,getBooking,updateStatus,updatePaymentStatus,deleteBooking} = require("../controllers/bookingController.js")
const router=express.Router()

router.post ("/",auth,createBooking)
router.get("/mine",auth,getBookingsByCustomer)
router.get("/shop/:shopId",auth,getBookingsForShop)
router.get("/:id",auth,getBooking)
router.patch("/:id",auth,updateStatus)
router.patch("/:id/payment",auth,updatePaymentStatus)
router.delete("/:id", auth, deleteBooking)

module.exports=router

    