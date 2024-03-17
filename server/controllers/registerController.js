import User from "../models/User.js";
import StatusCodes from "http-status-codes";
import asyncWrapper from "../middleware/async.js";
// import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/index.js";
import { UnauthenticatedError } from "../errors/index.js";
import { attachCookiesToResponse, createTokenUser } from "../utils/index.js";

const register = asyncWrapper(async (req, res) => {
    // const user = await User.create({ ...req.body });

    // const token = user.createJWT();

    // res.status(StatusCodes.CREATED).json({
    //     user: { name: user.name },
    //     token,
    // });

    const { email, name, password, role } = req.body;

    const emailAlreadyExists = await User.findOne({
        email,
    });

    if (emailAlreadyExists) {
        throw new BadRequestError("Email already exists");
    }

    const user = await User.create({ email, name, password, role });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
});

// TO DO COOKIE IMPLEMENTATION

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    // const user = await User.findOne({ email }).select("+password");
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    
    console.log("tokenUser: ", tokenUser);
    const token = user.createJWT({payload: tokenUser});

    // res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
    res.status(StatusCodes.OK).json({ user: tokenUser, token });
});

const logout = asyncWrapper(async (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });

    res.status(StatusCodes.OK).json({
        message: "User logged out successfully",
    });
});

export { register, login, logout };
