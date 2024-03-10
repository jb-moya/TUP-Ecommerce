import User from "../models/User.js";
import StatusCodes from "http-status-codes";
import asyncWrapper from "../middleware/async.js";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request.js";
import { UnauthenticatedError } from "../errors/unauthenticated.js";

const register = asyncWrapper(async (req, res) => {
    const user = await User.create({ ...req.body });

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
        user: { name: user.name },
        token,
    });
});

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

    const token = user.createJWT();


    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
});

export { register, login };
