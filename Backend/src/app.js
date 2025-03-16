import express from 'express'
import cors from 'cors'

import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: https://round-robin-client.onrender.com,
    credentials: true
}));
app.use(express.json({
    limit: "10kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "10kb",
}))
// app.use(express.static("public"))

app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Connectd succesfully");

})
import adminRouter from './routes/admin.router.js'
app.use('/api/v1/admin',adminRouter)

import couponRouter from './routes/coupon.router.js'

app.use('/api/v1/coupon',couponRouter)

export default app;