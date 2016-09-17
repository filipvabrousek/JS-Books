var nav = document.querySelector("nav");
var navWrapper = document.querySelector("#nav-wrapper");
var burger = document.querySelector("#burger");
var hide = document.querySelector("#hide");
var content = document.querySelector("#content");

burger.addEventListener("click", function() {
  navWrapper.style.display = "block";

  nav.style.display = "block";
  this.style.display = "none";

});

hide.addEventListener("click", function() {
  nav.style.display = "none";
  navWrapper.style.display = "none";
  burger.style.display = "block";

});

//---------map

  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(51.5, -0.2),
    zoom: 10
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);
