import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected' ,()=>{
            console.log("Database connected");
        })

        connection.on('error' ,(err) =>{
            console.log("Please make sure db is connected properly" + err);
            process.exit();
            
        })

    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
        
        
    }
}
