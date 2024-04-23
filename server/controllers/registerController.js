import User from "../models/User.js";
import StatusCodes from "http-status-codes";
import asyncWrapper from "../middleware/async.js";
import { BadRequestError } from "../errors/index.js";
import { UnauthenticatedError } from "../errors/index.js";
import { attachCookiesToResponse, createTokenUser } from "../utils/index.js";

const { Customer, Organization, Admin } = User;

const register = asyncWrapper(async (req, res) => {

    const { role } = req.body;

    if (role == 'admin') {

        const { email, password } = req.body;

        const emailAlreadyExists = await Admin.findOne({
            email
        });
    
        if (emailAlreadyExists) {
            throw new BadRequestError("EMAIL already exists");
        }
    
        const admin = await Admin.create({ email, password, role });
        const tokenUser = createTokenUser(admin);
        attachCookiesToResponse({ res, user: tokenUser });
    
        res.status(StatusCodes.CREATED).json({ user: tokenUser });

    } else if ( role == 'customer') {

        const { firstName, lastName, email, password, dateOfBirth, contactNumber } = req.body;

        const emailAlreadyExists = await Customer.findOne({
            email
        });

        if (emailAlreadyExists) {
            throw new BadRequestError("EMAIL already exists");
        }

        const customer = await Customer.create({ firstName, lastName, email, password, dateOfBirth, contactNumber, role });
        const tokenUser = createTokenUser(customer);
        attachCookiesToResponse({ res, user: tokenUser });

    } else if ( role == 'seller') {

        const { orgName, email, password } = req.body;

        const emailAlreadyExists = await Organization.findOne({
            email
        });

        if (emailAlreadyExists) {
            throw new BadRequestError("EMAIL already exists");
        }

        const org = await Organization.create({ orgName, email, password, role });
        const tokenUser = createTokenUser(org);
        attachCookiesToResponse({ res, user: tokenUser });
    } else {
        throw new BadRequestError("Invalid role");
    }

});

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    // const user = await User.findOne({ email }).select("+password");
    const user = await Admin.findOne({ email }) || await Customer.findOne({ email }) || await Organization.findOne({ email });

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
