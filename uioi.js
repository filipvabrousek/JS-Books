var show = document.querySelector(".s");
var hide = document.querySelector(".h");
var done = document.querySelector(".done");
var modal = document.querySelector("#modal");

show.addEventListener("click", function() {
  modal.style.display = "block";
  modal.classList.add("animation");
});

hide.addEventListener("click", function() {
  modal.style.display = "none";
});

done.addEventListener("click", function() {
  modal.style.display = "none";
});
