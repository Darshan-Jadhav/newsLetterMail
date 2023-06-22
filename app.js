const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { subscribe } = require("diagnostics_channel");

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html"); 
 })

 app.post("/failure.html",function(req,res){
  res.sendFile(__dirname+"/signUp.html");
 })

 app.post("/",function(req,res){
    const fistName = req.body.first_name;
    const lastName = req.body.last_name;
    const emailInfo = req.body.email;
     console.log(req.body);

    const data = {
        members:[{
        email_address: emailInfo,
          status: "subscribed",
          merge_fields: {
            FNAME : fistName,
            LNAME : lastName  }
          }]
        };
    

    const jsonData = JSON.stringify(data);

    const url ="https://us12.api.mailchimp.com/3.0/lists/cef701d638";
    
    const options ={
      method : "POST",
      auth :"darshan1:af99f7b3e5c6003e3826e4f01119c18e-us12"
    };

    const request = https.request(url,options,function(responce){

      if (responce.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
      }
      else {
        res.sendFile(__dirname+"/failure.html");
      }
        responce.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    
    
       
    // request.write(jsonData);
    request.end();


 })

app.listen(3000,function(err){
    if(err) throw err;
    console.log("Serving on port 3000");
})


// API Key
// af99f7b3e5c6003e3826e4f01119c18e-us12
// cef701d638