"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const router = express.Router();
router.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname + "/index.html"));
});

async function get24Hour() {
  return await axios
    .get(
      "https://api-pub.bitfinex.com/v2/stats1/leo.burn.acc:1h:bal/hist?limit=24"
    )
    .then(body => {
      var tburn = 0;
      for (var i = 0; i < body.data.length; ++i) {
        tburn = tburn + body.data[i][1];
      }
      return tburn;
    });
}

async function getSupply() {
  return await axios
    .get("https://api-pub.bitfinex.com/v2/stats1/leo.burn.supply:1d:val/last")
    .then(body => {
      return body.data[1];
    });
}

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get("/test", (req, res) => res.json({ value: "test" }));
router.get(
  "/24hr",
  asyncMiddleware(async (req, res, next) =>
    res.json({ value: await get24Hour() })
  )
);
router.get(
  "/supply",
  asyncMiddleware(async (req, res, next) =>
    res.json({ value: await getSupply() })
  )
);

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/js", express.static("js"));

module.exports = app;
module.exports.handler = serverless(app);
