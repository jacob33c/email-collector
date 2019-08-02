//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
  console.log("server is running on server 3000");
});

app.post("/", function(req,res){
  var firstName = req.body.firstName;
  var lastName =  req.body.lastName;
  console.log(firstName);
});

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
});
