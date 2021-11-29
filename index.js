import fs from "fs";
import express from "express"
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
import {studentmentorRouter} from "./routes/userMentor.js";
import { filesRouter } from "./routes/files.js";

const app=express();
dotenv.config();
const PORT = process.env.PORT || 5234;

const MONGO_URL = process.env.MONGO_URL;
// mongodb+srv://vinuppriya:<password>@cluster0.xu3bs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.use(express.json());
app.use(cors());


export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb connected");
  
  
  return client;
}

export const client = await createConnection();





app.use("/studentmentor",studentmentorRouter);
app.use("/files",filesRouter);
  

app.get("/",(request,response)=>{
    
    response.send("For create file '/createfile' \n For retrieve file '/readfile'");

})



    
app.listen(PORT,()=>{console.log("server started")});


