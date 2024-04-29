import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticated.js";

const authenticateUser = async (req, res, next) => {
    // token
    // console.log("res", res);
    // console.log("req.cookies", req.cookies);
    // console.log("req.signedCookies", req.signedCookies);
    // console.log('req', req)
    console.log("req", req.cookies);
    const token = req.signedCookies.token;

    // const token = req.headers.authorization.split(" ")[1];

    console.log("token", token);

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
