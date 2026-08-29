
const Shop=require("../models/shop.js")


async function createShop(req,res){
    try{
    const {name,location}=req.body
    const ownerId=req.user.id
    if (req.user.role !=="shopOwner"){
        return res.status(403).json({message:"not allowed"})
    }
    
    const newShop= await Shop.create({
    ownerId,
    name,
    location
})
    res.status(201).json(newShop)
}
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getMyShops(req,res){
    try{
        const shops=await Shop.find({ownerId:req.user.id})
        res.status(200).json(shops)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

async function getAllShops(req,res){
    try{
        const shops= await Shop.find({})
        res.status(200).json(shops)
  }
    
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function getShop(req, res) {
try{
        const shop = await Shop.findById(req.params.id)
         if (!shop) {
            return res.status(404).json({message:"Shop not found"})
        }

        res.status(200).json(shop)
  }
    
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

async function updateShop(req,res) {
    try {
        const shop = await Shop.findById(req.params.id)

        if (!shop) {
            return res.status(404).json({message:"Shop not found"})
        }

        if (shop.ownerId.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to update this shop"})
        }

        const { name, location } = req.body

        const updatedShop = await Shop.findByIdAndUpdate(
            req.params.id,
            { name, location },
            { new: true }
        )

        res.status(200).json(updatedShop)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}


module.exports={createShop,getMyShops,getAllShops,getShop,updateShop}

