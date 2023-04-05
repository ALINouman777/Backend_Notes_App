import express from "express";
import { Login,Signup,Myprofile,Logout} from "../Controllers/usercontroller.js";
import { isAuth } from "../middlewares/Middleware.js";


const route = express.Router();

route.post("/login",Login);
route.post("/SignUp" ,Signup);
route.get("/logout",isAuth,Logout)
route.get("/me",isAuth,Myprofile)

export default route