//import User from "../models/User.js";
import Users from "../models/User.js";

const { Customer, Organization, Admin } = Users;

import { StatusCodes } from "http-status-codes";
import { createCustomError } from "../errors/index.js";
import { checkPermissions } from "../utils/checkPermissions.js";
import asyncWrapper from "../middleware/async.js";
import { BadRequestError } from "../errors/index.js";
import { UnauthenticatedError } from "../errors/index.js";
import { attachCookiesToResponse, createTokenUser } from "../utils/index.js";

// ADMIN FUNCTIONS
const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await Admin.find({}, "-password");
    res.status(StatusCodes.OK).json({ users });
});

const getSingleUser = asyncWrapper(async (req, res, next) => {
    console.log("req.user", req.user);

    // check for role
    let user = null;
    if (req.user.role === "customer") {
        console.log("req rolee", req.user.role);
        console.log("req.user", req.user);
        user = await Customer.findOne({ _id: req.user.userId });
    } else if (req.user.role === "organization") {
        user = await Organization.findOne({ _id: req.user.userId });
    } else if (req.user.role === "admin") {
        user = await Admin.findOne({ _id: req.user.userId });
    }

    // const { id: userId } = req.params;
    // const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
        return next(createCustomError(`No user with id : ${userId}`, 404));
    }

    checkPermissions(req.user, user._id);
    // res.status(StatusCodes.OK).json();
    res.status(StatusCodes.OK).json({ user });
});

const showCurrentUser = asyncWrapper(async (req, res) => {
    console.log(" r e q . u s e r", req.user);
    res.status(StatusCodes.OK).json({ user: req.user });
});

// const updateUser = asyncWrapper(async (req, res) => {
//     // NOTE: SOME CREDENTIALS CANNOT BE UPDATED

//     // const { email, name } = req.body;
//     // if (!email || !name) {
//     //     throw new BadRequestError("Please provide email and name");
//     // }

//     // const user = await User.findOne({ _id: req.user.userId });

//     const user = await User.findOneAndUpdate(
//         { _id: req.user.userId },
//         req.body,
//         { new: true, runValidators: true }
//     );

//     // user.email = email;
//     // user.name = name;

//     await user.save();

//     const tokenUser = createTokenUser(user);
//     attachCookiesToResponse({ res, user: tokenUser });
//     res.status(StatusCodes.OK).json({ user: tokenUser });
// });

// const updateUserPassword = asyncWrapper(async (req, res) => {
//     const { currentPassword, newPassword } = req.body;
//     if (!currentPassword || !newPassword) {
//         throw new BadRequestError("Please provide current and new password");
//     }

//     const user = await User.findOne({ _id: req.user.userId }).select(
//         "+password"
//     );

//     const isPasswordCorrect = await user.comparePassword(currentPassword);

//     if (!isPasswordCorrect) {
//         throw new UnauthenticatedError("Invalid credentials");
//     }

//     user.password = newPassword;
//     await user.save();

//     // const tokenUser = createTokenUser(user);
//     // attachCookiesToResponse({ res, user: tokenUser });
//     res.status(StatusCodes.OK).json({ msg: "Password updated successfully" });
// });

export {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    //updateUser,
    //updateUserPassword,
};
