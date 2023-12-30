import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'


dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json({limit: 2000000}));
app.use(express.urlencoded({limit: 2000000, extended: false}));
// app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json({limit:'20mb'}))
app.listen(PORT, ()=>console.log('listening on port 5000'))










app.get('/', (req, res)=>{
    res.status(200).json("welcom skillGuardian homepage")
})
app.get('/post', (req, res)=>{
    res.status(200).json("welcom skillGuardian homepage")
})