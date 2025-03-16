// import { Admin } from "../model/admin.model.js";
import { ClaimHistory } from "../model/cliam.model.js";
import { Coupon } from "../model/coupon.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResonse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/ayncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (adminUsername) => {
    try {
        const accessToken = jwt.sign(
            { username: adminUsername, role: "admin" },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            { username: adminUsername, role: "admin" },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Failed to generate tokens");
    }
};
const adminLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }

   
    if (username !== process.env.ADMIN_USERNAME) {
        throw new ApiError(401, "Invalid username");
    }

    
    if (!bcrypt.compare(password, process.env.ADMIN_PASSWORD)) {
        throw new ApiError(401, "Invalid password");
    }


    
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(username);

    
    const options = { httpOnly: true, secure: true };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ accessToken, refreshToken, message: "Admin logged in successfully" });
});



const logoutAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined,
        }
    }, {
        new: true
    })
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResonse(200, "Admin loggedout successfully"))
})

const viewCoupons=asyncHandler(async (req,res) => {
    const coupons=await Coupon.find();
    return res.status(200).json(new ApiResonse(200,coupons,"Get all the coupons successfully"))
})

const addCoupon =asyncHandler(async (req,res) => {
    const {code}=req.body;
    // console.log(req.body);
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
        throw new ApiError(400, "Coupon code already exists");
    }

    const newCoupon=new Coupon({code});
    await newCoupon.save();
    return res.status(200).json(new ApiResonse(200,{},"Coupon added successfully"))
}) 
const viewClaimHistory = asyncHandler(async (req, res) => {
    const claims = await ClaimHistory.find()
        .populate("couponId", "code")
        .select("ipAddress browserSession couponId createdAt");
    console.log(claims);
    
    return res.status(200).json(new ApiResonse(200, claims, "View Claim History done"));
});


const updateCoupon=asyncHandler(async (req,res) => {
    const { isActive } = req.body;
    // console.log(req.body);
    
    const coupon = await Coupon.findById(req.params.id);
    // console.log(coupon);
    

    if (!coupon) {
        throw new ApiError(400,"Coupon not found");
    }

    coupon.isActive = isActive;
    await coupon.save();
    return res.status(200).json(new ApiResonse(200,{coupon},"Coupon updated successfully"))
})

export {adminLogin,logoutAdmin,viewCoupons,addCoupon,viewClaimHistory,updateCoupon};