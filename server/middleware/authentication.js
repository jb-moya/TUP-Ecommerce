import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticated.js";

const authenticateUser = async (req, res, next) => {
    // const authHeader = req.headers.authorization;

    // console.log("authHeader: ", authHeader);

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     throw new UnauthenticatedError("Authentication invalid");
    // }

    // const token = authHeader.split(" ")[1];
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     const user = await User.findById(decoded.id).select("-password");

    //     req.user = { userId: decoded.userId, name: decoded.name, role: decoded.role};

    //     // const user = await User.findOne({ _id: decoded.userId });
    //     // if (!user) {
    //     //     throw new UnauthenticatedError("No user found");
    //     // }
    //     // req.user = user;
    //     next();
    // } catch (error) {
    //     throw new UnauthenticatedError("Authentication invalid");
    // }

    // token
    const token = req.signedCookies.token;

    // console.log(
    //     "req.signedCookies: ",
    //     req.signedCookies,
    //     "token: ",
    //     token
    // )

    if (!token) {
        throw new UnauthenticatedError("Authentication invalid");
    }

    try {
        const { name, userId, role } = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = { name, userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid");
    }
};

export { authenticateUser };
