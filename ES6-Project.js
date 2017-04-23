const UICtrl = (() =>{
   
const DOMStrings = {
    desc:"#desc",
    dist: "#dist",
    btn: "button" ,
    run: ".run",
    bike: ".bike",
    swim: ".swim",
    data: "#data-list",
    select: "#s",
    sum: "h2"
    
};
    
    
const S = (e) => {
   return document.querySelector(e);
}
  
let changedType;
      
S(DOMStrings.select).addEventListener("change", ()=> {
   changedType = S(DOMStrings.select).value;
    return changedType;
});
    
    

let title = S(DOMStrings.desc).value;
let distance = S(DOMStrings.dist).value;
let sum = 0;
    
const add =() =>{
    
    let html;
    if (changedType === "Run"){
         html = `<div class="run">` + title + " Run" + " (" + distance + " km)" + `</div>`; 
    } else if (changedType === "Bike"){
        html = `<div class="bike">`+ title + " Bike" + " (" + distance + " km )" +`</div>`;  
    } else if (changedType === "Swim"){
         html = `<div class="swim">`+ title + " Swim" + " (" + distance + "km )" + `</div>`;
    }
  

S(DOMStrings.data).insertAdjacentHTML("beforeend", html);
sum += Number(distance);
    
S(DOMStrings.sum).innerHTML = sum;
}  
    
const addEL = () =>{
    S(DOMStrings.btn).addEventListener("click", add);
}  
    

const init = () =>{
    console.log("App has started");
    addEL();
}
    return{
      S,
    add,
    addEL,
    init
        
    }
})();


UICtrl.init();



/*

<!DOCTYPE html>

<head>


</head>

<body>

<h1>Total sport kilometers</h1>
    
<!-------------------------DATA INPUT------------------->
<section id="data-input">

<input type="text" id="desc" placeholder="enter title" value="Initial title">
<input type="number" id="dist" placeholder="enter distance" value = 1>
    
<select id="s">
<option>Please select</option>
<option>Run</option>  
<option>Bike</option>
<option>Swim</option>
</select>
    
<button>+</button>
    
<h2>
Sum    
</h2>
</section>
    
    
    
<!-------------------------DATA LIST------------------->
<section id="data-list">


<!---Activities---> 
    
</section>

<style>
    *{
    margin: 0;
    padding: 0;
    font-family: Arial;
    }
    
    
    
    input{
    padding: 20px;
    border: 3px solid #03A9F4;
        margin-bottom: 0.5em;
    }
    
    select{
    border: none;
    font-size: 1em;
    padding: 20px;
    background: "#8BC34A";
    }
    
    button{
    border: none;
     font-size: 1em;
    padding: 20px; 
    background: "#8BC34A";
    }
    
    
    div{
    background: #3498db;
    margin-bottom: 0.5em;
    color: #fff;
    }
    
    
    
    /*???????????*/
    .run{
         padding: 20px;
        background: "#8BC34A";
        
    }
    
    .bike{
         padding: 20px;
        background: "#FF5722";
    }
    
    .swim{
         padding: 20px;
        background: "#03A9F4";
    }
</style>
<script src="a.js"></script>
</body>




*/
