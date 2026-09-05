
require("dotenv").config();

const express=require ("express")
const app=express();
const mongoose=require ("mongoose")
const cors = require("cors")

const authRoutes=require("./routes/authRoutes.js")
const vehicleRoutes = require("./routes/vehicleRoutes.js")
const shopRoutes = require("./routes/shopRoutes.js")
const serviceRoutes = require("./routes/serviceRoutes.js")
const bookingRoutes = require("./routes/bookingRoutes.js")
const reviewRoutes = require("./routes/reviewRoutes.js")
const userRoutes = require("./routes/userRoutes.js")

app.use(cors());
app.use(express.json());          
app.use("/api/auth", authRoutes)
app.use("/api/vehicles", vehicleRoutes)
app.use("/api/shops", shopRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/users", userRoutes)

main().then(()=>{
    console.log("connnected to db"); 
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(process.env.MONGO_URI)
}
app.get("/",(req,res)=>{
    res.send("robot")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})


