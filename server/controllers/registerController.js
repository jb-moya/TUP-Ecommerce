import User from "../models/User.js";
import StatusCodes from "http-status-codes";
import asyncWrapper from "../middleware/async.js";
import { BadRequestError } from "../errors/index.js";
import { UnauthenticatedError } from "../errors/index.js";
import { attachCookiesToResponse, createTokenUser } from "../utils/index.js";

const { Customer, Organization, Admin } = User;

const register = asyncWrapper(async (req, res) => {
    const { role } = req.body;

    if (role == "admin") {
        const { email, password } = req.body;

        const emailAlreadyExists = await Admin.findOne({
            email,
        });

        if (emailAlreadyExists) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "Email already exists" });
        }

        const admin = await Admin.create({ email, password, role });
        const tokenUser = createTokenUser(admin);
        attachCookiesToResponse({ res, user: tokenUser });

        res.status(StatusCodes.CREATED).json({ user: tokenUser });
    } else if (role == "customer") {
        const {
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            contactNumber,
        } = req.body;

        const emailAlreadyExists = await Customer.findOne({
            email,
        });

        if (emailAlreadyExists) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "Email already exists" });
        }

        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            contactNumber,
            role,
        });
        const tokenUser = createTokenUser(customer);
        attachCookiesToResponse({ res, user: tokenUser });

        res.status(StatusCodes.CREATED).json({ user: tokenUser });
    } else if (role == "seller") {
        const {
            orgName,
            email,
            phoneNum,
            password,
            repName,
            repPos,
            repEmail,
            description,
            accreditationDoc,
        } = req.body;

        const emailAlreadyExists = await Organization.findOne({ email });

        if (emailAlreadyExists) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "Email already exists" });
        }

        const org = await Organization.create({
            orgName,
            email,
            contactNumbers: [phoneNum],
            representative: {
                name: repName,
                position: repPos,
                email: repEmail,
            },
            password,
            description,
            role,
            accreditationDoc,
        });

        const tokenUser = createTokenUser(org);
        attachCookiesToResponse({ res, user: tokenUser });

        return res.status(StatusCodes.CREATED).json({ user: tokenUser });
    } else {
        throw new BadRequestError("Invalid role");
    }
});

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Please provide email and password" });
    }
    // const user = await User.findOne({ email }).select("+password");
    const user =
        (await Admin.findOne({ email })) ||
        (await Customer.findOne({ email })) ||
        (await Organization.findOne({ email }));

    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Invalid email" });
    }

    // console.log("user: ", user);
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Invalid password" });
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    const token = user.createJWT({ payload: tokenUser });

    // console.log("tokenUser hehee: ", tokenUser);
    // console.log("token: ", token);

    res.status(StatusCodes.OK).json({ user });
});

const logout = asyncWrapper(async (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });

    res.status(StatusCodes.OK).json({});
});

export { register, login, logout };
