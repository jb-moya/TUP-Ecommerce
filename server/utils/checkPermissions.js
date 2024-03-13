import { createCustomError } from "../errors/index.js";

const checkPermissions = (
    requestUser,
    resourceUserId,
    enforceAdminAccess = true
) => {
    // console.log(requestUser);
    // console.log(resourceUserId);
    // console.log(typeof resourceUserId);
    if (enforceAdminAccess && requestUser.role === "admin") return;
    if (requestUser.userId === resourceUserId.toString()) return;

    throw createCustomError("Not authorized to access this route", 401);
};

export { checkPermissions };
