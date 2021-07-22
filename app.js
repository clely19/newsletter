// Installed Express, Body-Parser, request modules 
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
 // used to get all the data from html Body Parser
 app.use(bodyParser.urlencoded({extended: true}));
 // Help us to use css and images ("assets")
app.use(express.static("public"));

app.get("/", function(req,res){

  res.sendFile(__dirname + "/signup.html");
  

});

app.post("/", function(req,res){ 

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
 // var address = req.body.address;
 // var phoneNumber = req.body.phoneNumber;


  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName,
         // ADDRESS: address,
          //PHONE: phoneNumber
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
  
    url:"https://us6.api.mailchimp.com/3.0/lists/dd2a3a556f",
    method: "POST",
    headers: {
      "Authorization": "clely1 50c8cd4c4636e087511fdc18a02a7b59-us6"
    }, 
    body: jsonData
  };

  request(options, function(error,response,body){
    if(error){
      res.send("There was a problem.");
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/sucess.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }

  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});


// 50c8cd4c4636e087511fdc18a02a7b59-us6

// dd2a3a556f