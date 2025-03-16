
import { ApiError } from "../utils/ApiError.js";

import jwt from 'jsonwebtoken'
// import { Admin } from "../model/admin.model.js";
import asyncHandler from "../utils/ayncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log( token);

        if (!token) {
            throw new ApiError(401, "Unauthorized access");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log( decodedToken); 

     
        if (decodedToken.username !== process.env.ADMIN_USERNAME) {
            throw new ApiError(401, "Unauthorized access");
        }

        req.user = { username: decodedToken.username, role: decodedToken.role };
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});