import express from "express"
import { connectDb } from "./Database/Connection.js";
import dotenv from 'dotenv';
import userRoute from "./Routes/Route.js"
import Taskroute from "./Routes/TaskRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"


const app= express();
dotenv.config();
connectDb();
app.use(cors({
    origin:['https://notes-app-7g2s.onrender.com'],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.use(cookieParser())
app.use(express.json())
app.use("/user", userRoute);
app.use("/task",Taskroute );


app.listen(process.env.PORT, ()=>{
    console.log(`server is listening `)
})