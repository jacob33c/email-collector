//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on server 3000");
});

app.post("/", function(req,res){
  var firstName = req.body.firstName;
  var lastName =  req.body.lastName;
  var email = req.body.email;

  var data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  app.post("/failure" , function(req,res){
    res.redirect("/");
  });


  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us15.api.mailchimp.com/3.0/lists/e6bffd1a68",
    method: "post",
    headers: {
        "Authorization" : "jacob1 eb9c14066cc5955578d72c08859e161c-us15"
    },
    body: jsonData
  };


  request(options, function(error, response, body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
      console.log(error);
    }
    else {
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
        console.log(response.statusCode);
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
});



// eb9c14066cc5955578d72c08859e161c-us15


// fb1353f1ea
