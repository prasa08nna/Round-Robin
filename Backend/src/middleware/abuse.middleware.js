import { ClaimHistory } from "../model/cliam.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/ayncHandler.js";

const preventAbuse = asyncHandler(async (req, res, next) => {
    const ipAddress = req.ip;
    const browserSession = req.cookies.sessionId || req.headers["user-agent"];

   
    const recentClaim = await ClaimHistory.findOne({ ipAddress, browserSession });

    if (recentClaim) {
        const cooldownTime = 3600000; // 1 hour
        const lastClaimTime = new Date(recentClaim.createdAt).getTime();

        if (Date.now() - lastClaimTime < cooldownTime) {
            throw new ApiError(401, "You must wait before claiming another coupon!");
        }
    }

    req.userSession = { ipAddress, browserSession };
    next();
});

export { preventAbuse };
