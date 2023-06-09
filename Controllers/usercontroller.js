import {User} from "../Database/model/User.js"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })
            .select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or password"
            })
        }
           const token = Jwt.sign({ _id: user._id }, "alinoumanisagoodboy");

            return res.status(200).cookie("token",token,{
                httponly:true,
                maxAge: 30 * 60 * 1000,
                sameSite:process.env.MODE ==="development"?"lax": "none",
                secure:process.env.MODE ==="development"?false:true,
            }).json({
                success: true,
                message:`Hy ${user.name}.`
            })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: "Error"
        })
    }
};

export const Signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedpass = await bcrypt.hash(password, 10)

        const formfiller = await User.create({
            name,
            email,
            password: hashedpass,
        })

        const token = Jwt.sign({ _id: formfiller._id }, "alinoumanisagoodboy");

        return res.status(201).cookie("token", token, {
            maxAge: 30 * 60 * 1000,
            httponly: true,
            secure:process.env.MODE ==="development"?false:true,
            sameSite: process.env.MODE ==="development"?"lax":'none',
        }).json({
            success: true,
            formfiller
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some problem occured"
        })
    }
};


export const Myprofile = async (req, res) => {
    const {_id}=req.user

    const a= await User.findById({_id})
    const token = Jwt.sign({ _id: req.user._id }, "alinoumanisagoodboy");

    res.status(200).cookie("token", token, {
        maxAge: 30 * 60 * 1000,
        httponly: true,
        secure:process.env.MODE ==="development"?false:true,
        sameSite: process.env.MODE ==="development"?"lax":'none',

    }).json({
        success:true,
        user:a
        })
}

export const Logout=(req,res)=>{

    res.status(200).cookie("token", "",{
        expires:new Date(Date.now()),
        secure:process.env.MODE ==="development"?false:true,
        sameSite: process.env.MODE ==="development"?"lax":'none',
    }).json({
        success: true,
        message:"Logged out successfully"
    })

}

export const allProfile=async(req, res)=>{
    const users=await User.find({});
    res.status(200).json({
        success:true,
        users
    })
}
