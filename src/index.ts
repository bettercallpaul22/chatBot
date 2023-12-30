import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import * as fs from 'fs-extra';
import { promisify } from 'util';
import { LocalStorage } from 'node-localstorage';
const writeFileAsync = promisify(fs.writeFile);

async function pushJsonToFile(jsonData: any, filePath: string): Promise<void> {
    try {
      // Convert the JSON data to a string
      const jsonString = JSON.stringify(jsonData, null, 2);
  
      // Write the JSON string to the specified file
      await writeFileAsync(filePath, jsonString, 'utf-8');
  
      console.log(`JSON data has been pushed to ${filePath}`);
    } catch (error) {
      console.error('Error pushing JSON data to file:', error.message);
    }
  }





dotenv.config()
const directoryPath = './storage';
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json({limit: 2000000}));
app.use(express.urlencoded({limit: 2000000, extended: false}));
// app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json({limit:'20mb'}))
app.listen(PORT, ()=>console.log('listening on port 5000'))










app.get('/', (req, res)=>{
    res.status(200).json("node bot")
})
app.post('/post', (req, res)=>{
    // const localstorage = new LocalStorage('./')
    const jsonData = { name: 'obaro paul' };
    // localstorage.setItem('name', JSON.stringify(jsonData))
    // const v = localstorage.getItem('name')
    const filePath = './filename.json';
    pushJsonToFile(jsonData, filePath);
    res.send(jsonData) 

})