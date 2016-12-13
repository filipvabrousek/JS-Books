/*
<p>Uppercased text of this paragraph will be logged into console.</p>
13.12.16
*/


var UP = {
  convert: function(a) {
    console.log(a.toUpperCase());
  }
}

var n = document.querySelector("p").textContent;
UP.convert(n);

