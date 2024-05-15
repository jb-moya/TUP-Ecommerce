import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const customerSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [40, "Name cannot be more than 40 characters"],
        minlength: [3, "Name cannot be less than 3 characters"],
    },
    lastName: {
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
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: '',
    },
    dateOfBirth: {
        type: Date,
        default: '',
    },
    contactNumber: {
        type: String,
        default: '',
        match: [
            /^(\+63|0)[0-9]{10}$/,
            "Please provide a valid Philippine contact number starting with +63 or 0 and followed by 10 digits",
        ],
    },
    image: {
        type: String,
        default: '', // Optional field
    },
});

const organizationSchema = mongoose.Schema ({
    orgName: {
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
    contactNumbers: [{
        type: String,
        default: '',
        match: [
            /^(\+63|0)[0-9]{10}$/,
            "Please provide a valid Philippine contact number starting with +63 or 0 and followed by 10 digits",
        ],
    }],
    representative: {
        name: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
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
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password cannot be less than 6 characters"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [1000, "Description cannot be more than 1000 characters"],
        minlength: [1, "Description cannot be less than 10 characters"],
    },
    affiliatedAccounts: [{
        name: {
            type: String,
            required: false
        },
        position: {
            type: String,
            required: false
        },
        email: {
            type: String,
            // required: [true, "Email is required"],
            required: false,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
            ],
            trim: true,
            lowercase: true,
        }
    }],
    role: {
        type: String,
        required: true,
    },
    orgImage: {
        type: String,
        required: false,
    },
    accreditationDoc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['enabled', 'disabled', 'pending'],
        default: 'pending',
    },
});

const adminSchema = mongoose.Schema ({
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
        required: true
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
        { userId: this._id, firstName: this.firstName, lastName: this.lastName,role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

customerSchema.methods.getFirstName = function () {
    return this.firstName;
};

customerSchema.methods.getLastName = function () {
    return this.lastName;
};

customerSchema.methods.getPassword = function () {
    return this.password;
};

customerSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

organizationSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

organizationSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.orgName, role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

organizationSchema.methods.getName = function () {
    return this.orgName;
};

organizationSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

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

export default {
    Customer: mongoose.model("Customer", customerSchema),
    Organization: mongoose.model("Organization", organizationSchema),
    Admin: mongoose.model("Admin", adminSchema)
};
