var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");

var getRows = require("./google");
//var auth = getAuth();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/getrows", (req, res) => {
  getRows(res);
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

var port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listening on port", port);
});
