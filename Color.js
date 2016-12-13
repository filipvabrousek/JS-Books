var ColorChanger = {
  change: function(x, y) {
    document.querySelector(x).style.background = y;
  }
}

ColorChanger.change("div", "green");

/*
<div></div>

div{
width: 180px;
height: 180px;
background: orange;
}

*/
