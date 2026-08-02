const {default : mongoose} = require("mongoose")


const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGO_URL)

        .then(()=>{console.log("MONGODB CONNECTED : )")})
        .catch((error)=>{
            console.log("Connection error:",error.message)
        });
        
     


    } catch (error) {
        console.log("Error:",error.message)
    }
}

module.exports={connectDB}