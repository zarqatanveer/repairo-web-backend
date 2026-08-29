
const Shop=require("../models/shop.js")
const Booking=require("../models/booking.js")
const Review=require("../models/review.js")

async function createReview(req,res){
    try{
        const {bookingId,rating,comment}= req.body
        const carOwnerId=req.user.id

    const booking=await Booking.findById(bookingId)
    if (!booking) {
    return res.status(404).json({message:"Booking not found"})
}
    if (booking.carOwnerId.toString()!==req.user.id){
        return res.status(403).json({message:"not allowed"})
    }

    if (booking.status !== "completed") {
    return res.status(400).json({message:"Booking must be completed before leaving a review"})
}
    const shopId=booking.shopId
    
    const newReview= await Review.create({
    carOwnerId,
    shopId,
    bookingId,
    rating,
    comment
})
    res.status(201).json(newReview)
}
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}


async function getAllReviews(req, res) {
    try {
        const reviews = await Review.find({ shopId: req.params.shopId })
        res.status(200).json(reviews)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports={createReview,getAllReviews}