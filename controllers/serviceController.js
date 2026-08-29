
const Service=require("../models/service.js")
const Shop=require("../models/shop.js")


async function addService(req,res){
    try{
    const {shopId,name,price,duration}=req.body
    const shop = await Shop.findById(shopId)
    
    if (!shop) {
            return res.status(404).json({message:"Shop not found"})
        }

    if (shop.ownerId.toString() !==req.user.id){
        return res.status(403).json({message:"not allowed"})
    }
    
    const newService= await Service.create({
    shopId,
    name,
    price,
    duration
})
    res.status(201).json(newService)
}
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function showServices(req, res) {
try{
        const shop = await Shop.findById(req.params.shopId)
         if (!shop) {
            return res.status(404).json({message:"Shop not found"})
        }
        
        const services= await Service.find({ shopId: req.params.shopId  })
        res.status(200).json(services)  
  }
    
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getServiceById(req, res) {
    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({ message: "Service not found" })
        }
        res.status(200).json(service)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

async function updateService(req,res) {
    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({message:"Service not found"})
        }
    const shop = await Shop.findById(service.shopId)

      if (shop.ownerId.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to update this service"})
        }

        const { name, price,duration  } = req.body

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { name,price,duration },
            { new: true }
        )

        res.status(200).json(updatedService)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function deleteService(req,res) {
    try {
        const service = await Service.findById(req.params.id)

        if (!service) {
            return res.status(404).json({message:"Service not found"})
        }

        const shop = await Shop.findById(service.shopId)

        if (shop.ownerId.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to delete this service"})
        }


        const deletedService = await Service.findByIdAndDelete(
            req.params.id
        )

        res.status(200).json(deletedService)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports={addService,showServices,getServiceById,updateService, deleteService}

