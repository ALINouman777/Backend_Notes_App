import mongoose from "mongoose";

const Schem= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false
    }

})

const Task= mongoose.model("Task",Schem);
export default Task