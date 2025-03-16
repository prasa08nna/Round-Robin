import mongoose from "mongoose";

const claimHistorySchema = mongoose.Schema(
    {
    ipAddress: 
    { 
        type: String, 
        required: true 
    },
    browserSession:
     {
         type: String, 
         required: true
    },
    couponId:
     { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Coupon" ,
        required:true
    },
    createdAt:
     { 
        type: Date,
        default: Date.now 
    },
});

export const ClaimHistory = mongoose.model("ClaimHistory", claimHistorySchema);
