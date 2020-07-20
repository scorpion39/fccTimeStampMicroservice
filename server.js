// server.js
// where your node app starts

// init project
const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config/config.env" });
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

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

app.get("/api/timestamp/", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: Date(),
  });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const dateValue = req.params.date_string;
  const theDate =
    dateValue == parseInt(dateValue)
      ? new Date(parseInt(dateValue))
      : new Date(dateValue);

  if (theDate.getTime()) {
    res.json({
      unix: theDate.valueOf(), // theDate.getTime() also returns the same
      utc: theDate.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

const PORT = process.env.PORT || 3000;

const listener = app.listen(PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
