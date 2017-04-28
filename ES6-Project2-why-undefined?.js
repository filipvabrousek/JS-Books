const UICtrl = (() => {

    /*--------------1-------------------------ACTIVITY CLASSES + DATA--------------------------------*/
    class Run {
        constructor(ID, title, distance) {
            this.ID = ID;
            this.title = title;
            this.distance = distance;
        }
    };

    class Bike {
        constructor(ID, title, distance) {
            this.ID = ID;
            this.title = title;
            this.distance = distance;
        }
    };

    class Swim {
        constructor(ID, title, distance) {
            this.ID = ID;
            this.title = title;
            this.distance = distance;
        }
    };



    var data = {
        activities: {
            Run: [],
            Bike: [],
            Swim: []
        },
        total: {
            runSum: 0,
            bikeSum: 0,
            swimSum: 0,
        }
    };


    /*---------------2-----------------------------------------------ADD THE ITEM----------------------------------------------
    (push to DATA array)
    */
    return {

        addItem(type, title, distance) {

            let ID;
            let newActivity;

            if (data.activities[type].length > 0) {
                ID = data.activities[type][data.activities[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === "Run") {
                newActivity = new Run(ID, title, distance);

            } else if (type === "Bike") {
                newActivity = new Bike(ID, title, distance);

            } else if (type === "Swim") {
                newActivity = new Swim(ID, title, distance);

            }

            data.activities[type].push(newActivity);
            return newActivity;

        }



    };




})();


//UICtrl.addItem("Run", "OP", 12);




const DOMCtrl = ((UICtrl) => {

    const DOMStrings = {
        desc: "#desc",
        dist: "#dist",
        btn: "button",
        run: ".run",
        bike: ".bike",
        swim: ".swim",
        data: "#data-list",
        select: "#s",
        rs: "#rs",
        bs: "#bs",
        ss: "#ss"
    };



    return {

        /*-----------------------------------ADD ITEM TO THE UI (OBJ and TYPE)--------------------*/
        addList(obj, type) {

            let html;

            let title = document.querySelector(DOMStrings.desc).value;
            let distance = document.querySelector(DOMStrings.dist).value;

            if (type === "Run") {
                //obj = new Run(ID, type, title, distance);
                html = `<h2 class="run">${obj.title} - ${obj.type} ${obj.distance} </h2>`;
                //runSum += Number(a.distance);

            } else if (type === "Bike") {
                //obj = new Bike(ID, type, title, distance);
                html = `<h2 class="bike">${obj.title} - ${obj.type} ${obj.distance} </h2>`;
                //bikeSum += Number(a.distance);

            } else if (type === "Swim") {
                //obj = new Swim(ID, type, title, distance);
                html = `<h2 class="swim">${obj.title} - ${obj.type} ${obj.distance} </h2>`;
                //swimSum += Number(a.distance);
            }

            document.querySelector(DOMStrings.data).insertAdjacentHTML("beforeend", html);

            /*
             console.log(runSum);
             S(DOMStrings.rs).innerHTML = `Run: ${runSum}`;
             S(DOMStrings.bs).innerHTML = `Bike: ${bikeSum}`;
             S(DOMStrings.ss).innerHTML = `Swim: ${swimSum}`;
             */
        },

        getInput() {
            return {
                type: document.querySelector(DOMStrings.select).value, // Run, Bike, Swim
                desc: document.querySelector(DOMStrings.desc).value,
                dist: parseFloat(document.querySelector(DOMStrings.dist).value)
            };
        },

        add2DOM() {
            let data = DOMCtrl.getInput();
            let newActivity = UICtrl.addItem(data.type, data.title, data.distance);
            DOMCtrl.addList(newActivity, data.type);
            console.log(newActivity);
            return newActivity;
        },


        /*--------------------------------------ADD EL---------------------------------------*/
        addEL() {

            document.querySelector(DOMStrings.btn).addEventListener("click", this.add2DOM);
            document.querySelector(DOMStrings.select).addEventListener("change", () => {
                changedType = document.querySelector(DOMStrings.select).value;
            });
            //S(DOMStrings.data).addEventListener("change", deleteItem);
        },

        /*--------------------------------------INIT---------------------------------------*/
        init() {
            console.log("App has started");
            this.addEL();
        }
    }

})(UICtrl);


DOMCtrl.init();




//beginning 23.4.2017

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
    
<h2 id="rs">Run sum</h2>
<h2 id="bs">Run sum</h2>
<h2 id="ss">Run sum</h2>
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
    

    
    #data-list > .swim{
        background: #26C6DA;
        padding: 1em;
        margin: 1em;
        color: #fff;
    }
    
    
        #data-list > .bike{
         background: #FFB74D;
        padding: 1em;
        margin: 1em;
        color: #fff;
    }
    
        #data-list > .run{
        background: #66BB6A;
        padding: 1em;
        margin: 1em;
        color: #fff;
    }
    
    
</style>
<script src="a.js"></script>
</body>



*/
