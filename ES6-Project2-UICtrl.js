const UICtrl = ((() => {

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
        activities:{
            Run: [],
            Bike:[],
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
      return{  
      
      addItem(type, title, distance){
        
        let ID;
        let newActivity;
           
        if(data.activities[type].length > 0){
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
    
    



}))();


//UICtrl.addItem("Run", "OP", 12);






/*




const DOMCtrl = (((UIC) => {
    
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
    
     



   return{
       

/*-----------------------------------ADD ITEM TO THE UI (OBJ and TYPE)--------------------*/
   addList(obj, type){

        let html;
        
        let title = document.querySelector(DOMStrings.desc).value;
        let distance = document.querySelector(DOMStrings.dist).value;
    
        if (type === "Run") {
             obj = new Run(ID, type, title, distance);
            html = `<h2 class="run">${obj.title} - ${obj.type} ${obj.distance} </h2>`;
            //runSum += Number(a.distance);
            
        } else if (type === "Bike") {
            obj = new Bike(ID, type, title, distance);
            html = `<h2 class="bike">${obj.title} - ${obj.type} ${obj.distance} </h2>`;
            //bikeSum += Number(a.distance);
            
        } else if (type === "Swim") {
            obj = new Swim(ID, type, title, distance);
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
    
       
/*--------------------------------------ADD EL---------------------------------------*/ 
     addEL(){
       document.querySelector(DOMStrings.btn).addEventListener("click", this.addList());
           document.querySelector(DOMStrings.select).addEventListener("change", () => {
            changedType = document.querySelector(DOMStrings.select).value;
        });
        //S(DOMStrings.data).addEventListener("change", deleteItem);
     },
       
/*--------------------------------------INIT---------------------------------------*/ 
   init(){
        console.log("App has started");
        this.addEL();
    }
}
    
}))(UICtrl);


DOMCtrl.init();



*/
