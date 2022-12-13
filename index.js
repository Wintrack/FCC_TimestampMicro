// index.js
// where your node app starts

// init project
var express = require("express");
var app = express()
var server = require('http').createServer(app)


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/:year-:month-:day", (req, res) => {
    let tmp = (req.params.year + "-" + req.params.month + "-" + req.params.day);
    const date_x = new Date(tmp);

    if (isNaN(date_x) == true) {
        res.json({ error : "Invalid Date" });
    } else {
        const timestampInMs = date_x.getTime();

        let date_utc = date_x.toUTCString();

        res.json({unix: timestampInMs, utc: date_utc});
    }
});

app.get("/api/", (req, res) => {
    let date = new Date();

    const timestampInMs = date.getTime();

    let date_utc = date.toUTCString();

    res.json({unix: timestampInMs, utc: date_utc});

});

// listen for requests :)
server.listen(80);
