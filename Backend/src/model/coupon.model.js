import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
    code: 
    { 
        type: String, 
        required: true, 
        unique: true 
    },
    isClaimed: 
    { 
        type: Boolean, 
        default: false 
    },
    isActive: 
    { type: Boolean, 
        default: true 
    },
    claimedBy: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "ClaimHistory", 
        default: null 
    },
    createdAt: 
    { 
        type: Date, 
        default: Date.now 
    }
},{timestamps:true});

export const Coupon= mongoose.model("Coupon", couponSchema);
