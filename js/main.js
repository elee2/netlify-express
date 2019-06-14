"use strict";

var supply = 0;
var burn24 = 1;

$.ajax({
  url:
    "https://api-pub.bitfinex.com/v2/stats1/leo.burn.acc:1h:bal/hist?limit=24",
  dataType: "jsonp",


  success: d => {
    payload = JSON.parse(d);
    var tburn = 0;
    for (var i = 0; i < payload.length; ++i) {
      tburn = tburn + payload[i][1];
    }
    burn24 = tburn;
  }
});
