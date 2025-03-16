import { Router } from "express";
import {  cliamCoupon} from "../controller/coupon.controller.js";

import { preventAbuse } from "../middleware/abuse.middleware.js";

const router = Router();

router.route('/claim-coupons').post(preventAbuse,cliamCoupon)

export default router;