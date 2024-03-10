import UnauthorizedError from "../errors/unauthorized.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { createCustomError } from "../errors/custom-api.js";
dotenv.config();

const authorizeSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        return next(
            createCustomError(
                "You are not allowed to perform this action",
                StatusCodes.UNAUTHORIZED
            )
        );
    }
    // const { user } = req;
    // console.log("user: ", user);
    // console.log("user.role: ", user.role);
    // if (user && user.role !== "seller") {
    //     throw new UnauthorizedError("Unauthorized to access this route");
    // }
    next();
};

export { authorizeSeller };
