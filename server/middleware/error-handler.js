import { CustomAPIError } from "../errors/custom-api.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = async (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, please try again",
    };

    if (err instanceof CustomAPIError) {
        console.log("Custom Error");
        return res.status(err.statusCode).json({ msg: err.message });
    }

    if (err.code && err.code === 11000) {
        console.log("Duplicate field error");
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field`;
    }
    // https://youtu.be/qwfE7fSVaZM?t=32785
    if (err.name === "ValidationError") {
        console.log("Validation Error");
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
    }

    if (err.name === "CastError") {
        console.log("Cast Error");
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.message = `Resource not found. Invalid: ${err.value}`;
    }

    // console.log("Error");
    return (
        res
            .status(customError.statusCode)
            // .json({ msg: "Something went wrong, please try again" });
            .json({ msg: customError.message }) // more detailed error message
    );
};

export default errorHandlerMiddleware;
