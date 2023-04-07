import express from "express"
import { addTask , fetchmyNotes,deleteNote,updateNote} from "../Controllers/Taskcontroller.js";
import { isAuth } from "../middlewares/Middleware.js";


const route= express.Router();

route.post("/add",addTask);
route.get("/my",isAuth,fetchmyNotes)
route.delete("/:id" , isAuth, deleteNote)
route.put("/update/:id",isAuth,updateNote)

export default route;