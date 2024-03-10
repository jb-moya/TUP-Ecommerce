import { StatusCodes } from "http-status-codes";
import { createCustomError } from "../errors/custom-api.js";

// const authorizePermissions = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(
//                 createCustomError(
//                     "You are not allowed to perform this action",
//                     StatusCodes.UNAUTHORIZED
//                 )
//             );
//         }
//         console.log("roles: ", roles);
//         next();
//     };
// };

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                createCustomError(
                    "You are not allowed to perform this action",
                    StatusCodes.UNAUTHORIZED
                )
            );
        }
        next(); // Calling next from the outer function's scope
    };
};


export { authorizePermissions };
