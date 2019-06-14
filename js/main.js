"use strict";

var supply = 0;
var burn24 = 1;
var distance = 100;

function refreshData() {
  $.get("/.netlify/functions/server/24hr", function(data) {
    burn24 = data.value;
  });
  $.get("/.netlify/functions/server/supply", function(data) {
    supply = data.value;
  });

  distance = (supply / burn24) * 24 * 60 * 60;
}

$(function() {
  setInterval(refreshData, 10000);
});

function adjustCountDown() {
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $(".item").html(
    days +
      "days " +
      hours +
      "hours " +
      minutes +
      "minutes " +
      seconds +
      "seconds "
  );
  distance = distance - 1;
}
