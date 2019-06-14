"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/index.html"));
});

router.get("/24hr", (req, res) => res.json({ route: req.originalUrl }));
router.get("/supply", (req, res) => res.json({ route: req.originalUrl }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/js", express.static("js"));

module.exports = app;
module.exports.handler = serverless(app);
