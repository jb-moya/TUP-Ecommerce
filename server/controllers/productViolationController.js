import { ProductViolation } from "../models/ProductViolation.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const createProductViolation = asyncWrapper(async (req, res) => {
    const productViolation = await ProductViolation.create(req.body);
    res.status(StatusCodes.CREATED).json({ productViolation });
});

export { createProductViolation };
