import mongoose from "mongoose";

export const  connectDb= ()=>{

    mongoose.connect(`${process.env.DB_STRING}/TaskApp`).then(()=>{
        console.log("connected to database")
    }).catch((error)=>{
        console.log(error)
    });
}