var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

var getRows = require("./google");
//var auth = getAuth();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ successful: true });
});

app.get("/getrows", (req, res) => {
  getRows(res);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
