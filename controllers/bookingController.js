
const Service=require("../models/service.js")
const Shop=require("../models/shop.js")
const Vehicle=require("../models/vehicle.js")
const Booking=require("../models/booking.js")


async function createBooking(req,res){
    try{
        const {vehicleId,shopId,serviceId,date}= req.body
        const carOwnerId=req.user.id

    const vehicle=await Vehicle.findById(vehicleId)
    if (!vehicle) {
    return res.status(404).json({message:"Vehicle not found"})
}
    if (vehicle.ownerId.toString()!==req.user.id){
        return res.status(403).json({message:"not allowed"})
    }

    const shop = await Shop.findById(shopId)
    if (!shop) {
            return res.status(404).json({message:"Shop not found"})
        }


    const service = await Service.findById(serviceId)
    if (!service) {
            return res.status(404).json({message:"Service not found"})
        }

    if (service.shopId.toString() !==shopId){
        return res.status(403).json({message:"not allowed"})
    }

    const totalPrice=service.price
    
    const newBooking= await Booking.create({
    carOwnerId,
    vehicleId,
    shopId,
    serviceId,
    date,
    totalPrice
})
    res.status(201).json(newBooking)
}
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getBookingsByCustomer(req,res){
    try{
        const booking = await Booking.find({ carOwnerId: req.user.id })
    .populate('shopId', 'name location')
    .populate('serviceId', 'name price')
    .populate('vehicleId', 'type plateNumber')
        res.status(200).json(booking)
  }
    
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getBookingsForShop(req, res) {
    try {
        const shop = await Shop.findById(req.params.shopId)

        if (!shop) {
            return res.status(404).json({message:"Shop not found"})
        }

        if (shop.ownerId.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to view this shop's bookings"})
        }

        const booking = await Booking.find({ shopId: req.params.shopId })
        .populate('carOwnerId', 'name email phone')
        .populate('serviceId', 'name price duration')
        .populate('vehicleId', 'type color plateNumber')
        res.status(200).json(booking)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getBooking(req, res) {
try{
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
        return res.status(404).json({message:"Booking not found"})
    }
    const shop = await Shop.findById(booking.shopId)

    if ((shop.ownerId.toString() === req.user.id) || (booking.carOwnerId.toString() === req.user.id) ) {
           res.status(200).json(booking)
    }

    else{
         return res.status(403).json({message:"Not authorized to see booking"})
    }    
  }
    
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function updateStatus(req,res) {
    try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) {
            return res.status(404).json({message:"Booking not found"})
        }
    const shop = await Shop.findById(booking.shopId)

      if (shop.ownerId.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to update this status"})
        }

        const { status } = req.body

        const updatedStatus = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )

        res.status(200).json(updatedStatus)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function updatePaymentStatus(req, res) {
    try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) return res.status(404).json({ message: "Booking not found" })

        const shop = await Shop.findById(booking.shopId)
        if (shop.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" })
        }

        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { paymentStatus: "paid" },
            { new: true }
        )
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
}

async function deleteBooking(req,res) {
    try {
        const booking = await Booking.findById(req.params.id)

    if (!booking) {
            return res.status(404).json({message:"Booking not found"})
    }

    const shop = await Shop.findById(booking.shopId)

    if (booking.carOwnerId.toString() === req.user.id ) {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id)
            res.status(200).json(deletedBooking)
    }

    else{
         return res.status(403).json({message:"Not authorized to delete booking"})
    }  

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports={createBooking,getBookingsByCustomer,getBookingsForShop,getBooking,updateStatus,updatePaymentStatus,deleteBooking}