const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res,next)=>{
    
    var data = fs.readFileSync("student.json");
    var jsonObj = JSON.parse(data);
    res.json(jsonObj);
})

app.post("/insert",(req,res)=>{
    let isSuccess=true;
    newStudent = req.body.student;
    var data = fs.readFileSync("student.json");
    var jsonObj = JSON.parse(data);
    jsonObj.students.push(newStudent);

    fs.writeFile("student.json",JSON.stringify(jsonObj),err=>{
        if(err){
            console.log('something went wrong');
            isSuccess=false;
            return;
        }
        console.log('added');
    })
    if(isSuccess){
        res.status(201).json({"message":'Student has been saved',"success":isSuccess}); 
    }
    else
    {
        res.status(409).json({"message":'something went wrong please try again',"success":isSuccess}); 
    }

})
app.listen(port,()=>console.log("port is running"));