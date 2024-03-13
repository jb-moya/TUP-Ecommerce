import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [40, "Name cannot be more than 40 characters"],
        minlength: [3, "Name cannot be less than 3 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password cannot be less than 6 characters"],
        // maxlength: [12, "Password cannot be more than 15 characters"],
    },

    role: {
        type: String,
        default: "user",
        enum: {
            values: ["customer", "seller", "admin"],
            message: "Please select a valid role",
        },
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        // next();
        return
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next();
});

userSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name, role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

userSchema.methods.getName = function () {
    return this.name;
};

userSchema.methods.getPassword = function () {
    return this.password;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    // return await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default mongoose.model("User", userSchema);
