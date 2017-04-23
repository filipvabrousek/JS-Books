const UICtrl = (() => {

    const DOMStrings = {
        desc: "#desc",
        dist: "#dist",
        btn: "button",
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

    let changedType = "Run";

    /*---------------------------------------ACTIVITY CLASS--------------------------------*/
    class Activity {
        constructor(type, title, distance) {
            this.type = type;
            this.title = title;
            this.distance = distance;
        }
    }


    let sum = 0;
    let a;

    /*-----------------------------------ADD ITEM TOT THE UI (WILL BE SOLVED)--------------------*/
    const addList = () => {

        let html;

        S(DOMStrings.select).addEventListener("change", () => {
            changedType = S(DOMStrings.select).value;
            return changedType;
        });
        let type = changedType;

        let title = S(DOMStrings.desc).value;
        let distance = S(DOMStrings.dist).value;


        a = new Activity(type, title, distance);

        if (changedType === "Run") {
            html = `<h2>${a.distance} ${a.type} - ${a.title}</h2>`;
        } else if (changedType === "Bike") {
            html = `<h2>${a.distance} ${a.type} - ${a.title}</h2>`;
        } else if (changedType === "Swim") {
            html = `<h2>${a.distance} ${a.type} - ${a.title}</h2>`;
        }


        S(DOMStrings.data).insertAdjacentHTML("beforeend", html);
        sum += Number(distance);
        S(DOMStrings.sum).innerHTML = sum;
    }


    const addEL = () => {
        S(DOMStrings.btn).addEventListener("click", addList);
    }



    const init = () => {
        console.log("App has started");
        addEL();
    }


    return {
        S,
        addEL,
        init,
        addList

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
    
    h1{
        text-align: center;
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
    
    #data-input{
        display: flex;
        justify-content: center;
    }
    #data-input > *{
      margin: 1em;
    }
    

    

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
