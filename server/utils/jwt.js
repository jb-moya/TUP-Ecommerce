import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createTokenUser = (user) => {
    let name = '';

    if (user.constructor.modelName === 'Admin') {
        name = user.email;
    } else if (user.constructor.modelName === 'Customer') {
        name = `${user.firstName} ${user.lastName}`;
    } else if (user.constructor.modelName === 'Organization') {
        name = user.orgName;
    }

    return {
        userId: user._id,
        name: name,
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
    const oneMonth = oneDay * 30;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneMonth),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};

export { createJWT, attachCookiesToResponse, createTokenUser };
 