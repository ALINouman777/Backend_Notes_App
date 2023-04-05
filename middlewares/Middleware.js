import jwt from "jsonwebtoken";
import {User} from "../Database/model/User.js";

export const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Login First"
        })
    }
    const data = jwt.verify(token, "alinoumanisagoodboy");
    const { _id } = data

    let user = await User.findOne({ _id })
    req.user = user;
    next();
}
