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

// ` WORK IN PROGRESS `
const customerSchema = new Schema ({
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
    dateOfBirth: {
        type: Date,
        required: [true, "Date of Birth is required"],
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
        match: [
            /^[0-9]{10}$/,
            "Please provide a valid 10-digit contact number",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password cannot be less than 6 characters"],
        // maxlength: [12, "Password cannot be more than 15 characters"],
    },
    role: {
        type: String,
        default: "customer"
    }
});

const organizationSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [100, "Name cannot be more than 100 characters"],
        minlength: [3, "Name cannot be less than 3 characters"],
    },
    credentials: [{
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
        },
    }],
    role: {
        type: String,
        default: "seller"
    }
});

const adminSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [100, "Name cannot be more than 100 characters"],
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
    },
    role: {
        type: String,
        default: "admin"
    }
});

customerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

customerSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name, role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

customerSchema.methods.getName = function () {
    return this.name;
};

customerSchema.methods.getPassword = function () {
    return this.password;
};

customerSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

organizationSchema.pre("save", async function (next) {
    if (!this.isModified("credentials")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedCredentials = await Promise.all(this.credentials.map(credential => ({
        email: credential.email,
        password: bcrypt.hash(credential.password, salt),
    })));
    this.credentials = hashedCredentials;
    next();
});

organizationSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name, role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

organizationSchema.methods.getName = function () {
    return this.name;
};

organizationSchema.methods.compareCredentials = async function (email, password) {
    const credential = this.credentials.find(cred => cred.email === email);
    if (!credential) {
        return false; // Email not found
    }

    const isMatch = await bcrypt.compare(password, credential.password);
    return isMatch;
};

adminSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name, role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

adminSchema.methods.getName = function () {
    return this.name;
};

adminSchema.methods.getPassword = function () {
    return this.password;
};

adminSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
// ^ WORK IN PROGRESS ^


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
