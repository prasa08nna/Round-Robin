import { ClaimHistory } from "../model/cliam.model.js";
import { Coupon } from "../model/coupon.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResonse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/ayncHandler.js";

let lastAssignedIndex = 0;

const cliamCoupon = asyncHandler(async (req, res) => {
    const { ipAddress, browserSession } = req.userSession;

    
    const availableCoupons = await Coupon.find({ isClaimed: false, isActive: true }).sort({ createdAt: 1 });

    if (availableCoupons.length === 0) {
        throw new ApiError(404, "No active coupons available");
    }

    
    const couponIndex = lastAssignedIndex % availableCoupons.length;
    const selectedCoupon = availableCoupons[couponIndex];

   
    lastAssignedIndex = (lastAssignedIndex + 1) % availableCoupons.length;

   
    selectedCoupon.isClaimed = true;
    await selectedCoupon.save();


    const claimHistory = new ClaimHistory({
        couponId: selectedCoupon._id,
        ipAddress,
        browserSession
    });

    await claimHistory.save();
    selectedCoupon.claimedBy = claimHistory._id; 
    await selectedCoupon.save(); 

   
    return res.status(200).json(new ApiResonse(200, selectedCoupon.code, "Coupon claimed successfully"));
});



export {cliamCoupon}