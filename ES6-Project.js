const UICtrl = (() => {

    /*--------------1-------------------------ACTIVITY CLASSES + DATA--------------------------------*/
    class Run {
        constructor(id, title, distance) {
            this.id = id;
            this.title = title;
            this.distance = distance;
        }
    };

    class Bike {
        constructor(id, title, distance) {
            this.id = id;
            this.title = title;
            this.distance = distance;
        }
    };

    class Swim {
        constructor(id, title, distance) {
            this.id = id;
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
            Run: 0,
            Bike: 0,
            Swim: 0,
        }
    };


    /*---------------2-----------------------------------------------ADD THE ITEM----------------------------------------------
    (push to DATA array)
    
    ADDITEM (TYPE, TITLE, DIST)
    */
    return {

        addItem(type, desc, dist) {

            let ID;
            let newActivity;

            if (data.activities[type].length > 0) {
                ID = data.activities[type][data.activities[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === "Run") {
                newActivity = new Run(ID, desc, dist);
               
            } else if (type === "Bike") {
                newActivity = new Bike(ID, desc, dist);

            } else if (type === "Swim") {
                newActivity = new Swim(ID, desc, dist);

            }

            data.activities[type].push(newActivity);
            return newActivity;   
        },
        
        calculateTotal(type){
            let sum = 0;
            data.activities[type].forEach(cur => {
      sum += cur.distance;
    });
            data.total[type] = sum;
           
            console.log(data.total[type]);
            
            
             return data.total[type];
              
            
        },
        
    /*-------DELETE FROM DATA STRUCURE---------
        deleteItem(type, id){
            let ids;
            let index;
            
            ids = data.activities[type].map(curr => curr.id);
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
            
            console.log("delete item called");
        }
*/


    };




})();


/*
UICtrl.addItem("Run", "Morning run", 12);
UICtrl.deleteItem("Run", 1);
*/


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
/*
*/
            if (type === "Run") {
                html = `<h2 class="run" id="run-${obj.id}">${obj.title} -  ${obj.distance} </h2>`;
            } else if (type === "Bike") {
                html = `<h2 class="bike" id="bike-${obj.id}">${obj.title} - ${obj.distance} </h2>`;
            } else if (type === "Swim") {
                html = `<h2 class="swim" id="swim-${obj.id}">${obj.title} -  ${obj.distance} </h2>`;
            }
            //console.log(`${obj.id}`);
        
 document.querySelector(DOMStrings.data).insertAdjacentHTML("beforeend", html);
        },
        
      /*-------DELETE FROM UI---------
        deleteList(type, id){
        
            let el = document.querySelector("#run-0");
         //still false?
            if(el){
            el = document.querySelector("#" + type + "-" + id);
            el.parentNode.removeChild(el);
            UICtrl.deleteItem("Run", id);
            return el;
            }
            
            console.log(el);
        },
        
     */
        
    
    
        getInput() {
            return {
                type: document.querySelector(DOMStrings.select).value, // Run, Bike, Swim
                desc: document.querySelector(DOMStrings.desc).value,
                dist: parseFloat(document.querySelector(DOMStrings.dist).value)
            };
        },

       
        add2DOM() {
            let data = DOMCtrl.getInput();
            let newActivity = UICtrl.addItem(data.type, data.desc, data.dist);
            // Run {ID: 0, title: "Initial title", distance: 1}
            DOMCtrl.addList(newActivity, data.type);
            
       var runSum =  UICtrl.calculateTotal("Run");
        var bikeSum = UICtrl.calculateTotal("Bike");
        var swimSum =   UICtrl.calculateTotal("Swim");
   
      
              
            document.querySelector(DOMStrings.rs).innerHTML = `Run ${runSum}`;
              document.querySelector(DOMStrings.bs).innerHTML = `Bike ${bikeSum}`;
              document.querySelector(DOMStrings.ss).innerHTML = `Swim ${swimSum}`;
            return newActivity;
        },

        

        /*--------------------------------------ADD EL---------------------------------------*/
        addEL() {

            document.querySelector(DOMStrings.btn).addEventListener("click", this.add2DOM);
            document.querySelector(DOMStrings.select).addEventListener("change", () => {
                changedType = document.querySelector(DOMStrings.select).value;
            });
            
            //document.querySelector(DOMStrings.data).addEventListener("click", this.deleteList("run", 0));
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




//beginning 23.4.2017 - 30.4.2017

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
