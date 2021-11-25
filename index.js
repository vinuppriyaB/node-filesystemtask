const fs=require("fs");
const express=require("express");
const app=express();
const PORT=5234;

app.get("/",(request,response)=>{
    
    response.send("hello");

})
app.get("/createfile",(request,response)=>{

    let dt=new Date();
    console.log(dt);
    let date=("0"+dt.getDate()).slice(-2);
    let month=("0"+(dt.getMonth()+1)).slice(-2);
    let year=dt.getFullYear();
    let hours=dt.getHours();
    let min=dt.getMinutes();
    let sec=dt.getSeconds();
    
    fs.writeFile(`./filefolder/${date}.${month}.${year}-${hours}.${min}.${sec}.txt`,`${dt}`,function(error){
        // /console.log("file created");
    });   
    response.send(`${date}.${month}.${year}-${hours}.${min}.${sec}.txt file created`);

})
app.get("/readfile",(request,response)=>{

    
    fs.readdir("./filefolder",function(error,files){
        // console.log(files)
        response.send(files);

    });
    

})



    
app.listen(PORT,()=>{console.log("server started")});