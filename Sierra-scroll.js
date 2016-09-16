var img = document.querySelector("img");
var i = 6;
var w = 100;
window.addEventListener("scroll", function() {
  w -= 0.3;
  i -= 0.3;
  img.style.filter = "blur(" + i + "px)";
  img.style.width = w + "%";
});
