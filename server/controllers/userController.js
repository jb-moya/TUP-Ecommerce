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
    const { role, status } = req.query;

    const queryObject = {};

    if (status) {
        queryObject.status = status;
    }

    let users;
    if (role === "customer") {
        users = await Customer.find(queryObject, "-password");
    } else if (role === "seller") {
        users = await Organization.find(queryObject, "-password");
    } else if (role === "admin") {
        users = await Admin.find(queryObject, "-password");
    } else {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Invalid role" });
    }

    res.status(StatusCodes.OK).json({ users });
});

const getAllOrganization = asyncWrapper(async (req, res) => {
    const sellers = await Organization.find({}, "-password");
    res.status(StatusCodes.OK).json({ sellers });
});

const getSingleOrganization = asyncWrapper(async (req, res) => {
    const { id } = req.query;
    console.log("id", id);
    const seller = await Organization.findById(id);
    res.status(StatusCodes.OK).json({ seller });
});

const getSingleUser = asyncWrapper(async (req, res, next) => {
    let user = null;
    if (req.user.role === "customer") {
        user = await Customer.findOne({ _id: req.user.userId });
    } else if (req.user.role === "organization") {
        user = await Organization.findOne({ _id: req.user.userId });
    } else if (req.user.role === "admin") {
        user = await Admin.findOne({ _id: req.user.userId });
    }
    if (!user) {
        return next(createCustomError(`No user with id : ${userId}`, 404));
    }

    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ user });
});

const showCurrentUser = asyncWrapper(async (req, res) => {
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

const updateStatusOrganization = asyncWrapper(async (req, res) => {
    const { id, status } = req.body;

    const seller = await Organization.findById(id);

    if (!seller) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Seller not found" });
    }

    seller.status = status;
    await seller.save();

    res.status(StatusCodes.OK).json({ seller });
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
    getSingleOrganization,
    getAllOrganization,
    updateStatusOrganization,
    updateUserPassword,
};
