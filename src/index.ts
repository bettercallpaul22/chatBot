import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { LocalStorage } from 'node-localstorage'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json({limit: 2000000}));
app.use(express.urlencoded({limit: 2000000, extended: false}));
// app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json({limit:'20mb'}))
app.listen(PORT, ()=>console.log('listening on port 5000'))










app.get('/', (req, res)=>{
    res.status(200).json("welcom skillGuardian hhdhd")
})
app.post('/post', (req, res)=>{
    try {
        
        let localStorage = new LocalStorage('./scratch');
        
            localStorage.setItem("name", "obaro")
          const value =  localStorage.getItem("name")
            res.status(200).json( value)
    } catch (error) {
        res.status(500).json(error.message)
    }
})