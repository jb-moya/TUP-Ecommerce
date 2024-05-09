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
    // // console.log("req.user", req.user);

    // check for role
    let user = null;
    if (req.user.role === "customer") {
        // // console.log("req rolee", req.user.role);
        // // console.log("req.user", req.user);
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
    // // console.log(" r e q . u s e r", req.user);
    res.status(StatusCodes.OK).json({ user: req.user });
});

const updateUser = asyncWrapper(async (req, res) => {
    if (req.user.role == "customer") {
        const user = await Customer.findOne({ _id: req.user.userId });

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "User not found" });
        }

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.contactNumber = req.body.contactNumber || user.contactNumber;
        user.address = req.body.address || user.address;
        user.gender = req.body.gender || user.gender;
        user.image = req.body.image || user.image;

        await user.save();

        const tokenUser = createTokenUser(user);
        attachCookiesToResponse({ res, user: tokenUser });
        res.status(StatusCodes.OK).json({ user });
    }
});

const updateUserPassword = asyncWrapper(async (req, res) => {
    if (req.user.role === "customer") {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.json({
                error: "Please provide current and new password",
            });
        }

        const user = await Customer.findOne({ _id: req.user.userId }).select(
            "+password"
        );

        const isPasswordCorrect = await user.comparePassword(currentPassword);

        if (!isPasswordCorrect) {
            return res.json({ error: "Invalid credentials" });
        }

        if (newPassword.length < 6) {
            return res.json({
                error: `New password must be at least 6 characters long`,
            });
        }

        user.password = newPassword;
        await user.save();

        return res.json({ msg: "Password updated successfully" });
    }
});

export {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
};
