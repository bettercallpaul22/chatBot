import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { webhook } from './controller/webhook';
dotenv.config()

const {DATABASE_URL_MONGO} = process.env


const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json({limit: 2000000}));
app.use(express.urlencoded({limit: 2000000, extended: false}));
// app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json({limit:'20mb'}))
app.listen(PORT, ()=>console.log('listening on port 5000'))


mongoose.connect(DATABASE_URL_MONGO)
.then(()=>{console.log("app connected to database")})
.catch((error)=>{console.log(error)})








app.get('/', (req, res)=>{
    res.status(200).json("WELCOM TO CHATBOT SERVICE APP")
})
app.post('/fulfillment', (webhook))