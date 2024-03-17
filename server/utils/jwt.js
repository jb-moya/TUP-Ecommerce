import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createTokenUser = (user) => {
    return {
        userId: user._id,
        name: user.name,
        role: user.role,
    };
};

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};

export { createJWT, attachCookiesToResponse, createTokenUser };
