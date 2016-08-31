var express = require('express');
var app = express();
app.set('view engine', 'jade');

function unixToNormal(unixDate){
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  var d = new Date(unixDate);
  return monthNames[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
}


app.get('/',function(req,res){
  res.sendFile('client/index.html',{root: __dirname })
});

app.get('/:time', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var unixDate = parseInt(req.params.time,10);
  if(isNaN(req.params.time)){
    var normalDate = Date.parse(req.params.time);
    if(isNaN(normalDate))
      res.send({unix:null,natural:null});
    else{
      res.send({unix:normalDate/1000,natural:unixToNormal(normalDate)});      
    }
  }else if (unixDate>Number.MAX_SAFE_INTEGER || unixDate<Number.MIN_SAFE_INTEGER ){
    res.send({unix:null,natural:null});
  }else{
    console.log("number given");
    res.send({unix:unixDate,natural:unixToNormal(unixDate*1000)});
  }
});

app.listen(process.env.PORT||8080, function () {
  console.log('Example app listening on port 8080!');
});