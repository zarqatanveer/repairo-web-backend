
const Vehicle=require("../models/vehicle.js")


async function createVehicle(req,res){
    try{
    const {type,color,year,plateNumber}=req.body
    const ownerId=req.user.id
    
    const newVehicle= await Vehicle.create({
    ownerId,
    type,
    color,
    year,
    plateNumber
})
    res.status(201).json(newVehicle)
}
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getUserVehicles(req,res){
    try{
        const vehicles= await Vehicle.find({ ownerId: req.user.id })
        res.status(200).json(vehicles)
  }
    
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getVehicleById(req, res) {
    try {
        const vehicle = await Vehicle.findById(req.params.id)

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" })
        }

        if (vehicle.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this vehicle" })
        }

        res.status(200).json(vehicle)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

async function updateVehicle(req, res) {
    try {
        const vehicle = await Vehicle.findById(req.params.id)

        if (!vehicle) {
            return res.status(404).json({message:"Vehicle not found"})
        }

        if (vehicle.ownerId.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to update this vehicle"})
        }

        const { type, color, year, plateNumber } = req.body

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            { type, color, year, plateNumber },
            { new: true }
        )

        res.status(200).json(updatedVehicle)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function deleteVehicle(req,res) {
    try {
        const vehicle = await Vehicle.findById(req.params.id)

        if (!vehicle) {
            return res.status(404).json({message:"Vehicle not found"})
        }

        if (vehicle.ownerId.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to delete this vehicle"})
        }

        const deletedVehicle = await Vehicle.findByIdAndDelete(
            req.params.id
        )

        res.status(200).json(deletedVehicle)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports = { createVehicle, getUserVehicles, getVehicleById, updateVehicle, deleteVehicle }