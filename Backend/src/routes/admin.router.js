import { Router } from "express";
import { addCoupon, adminLogin, logoutAdmin, updateCoupon, viewClaimHistory, viewCoupons } from "../controller/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();


router.route('/login').post(adminLogin)
router.route('/logout').post(verifyJWT,logoutAdmin)
router.route('/get-coupons').get(verifyJWT, viewCoupons)
router.route('/add-coupons').post(verifyJWT,addCoupon)
router.route('/coupons/:id/toggle').put(verifyJWT, updateCoupon)

router.route('/view-history').get(verifyJWT, viewClaimHistory)

export default router;