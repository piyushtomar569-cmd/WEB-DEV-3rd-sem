import express from "express";
import fs from "fs";
const app=express();
app.use(express.json());

const port=6000;
app.get("/",(req,res)=>{
    fs.readFile("index.html",(err,data)=>{
        if(err){
            res.status(500).send('Error Reading file');
        }
        else{
            res.send(data);
        }
    });
});
app.get("/about",(req,res)=>{
    fs.readFile("about.html",(err,data)=>{
        if(err){
            res.status(500).send('Error Reading file');
        }
        else{
            res.send(data);
        }
    });
});
app.get("/contact",(req,res)=>{
    fs.readFile("contact.html",(err,data)=>{
        if(err){
            res.status(500).send('Error Reading file');
        }
        else{
            res.send(data);
        }
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}, http://localhost:${port}`);
});