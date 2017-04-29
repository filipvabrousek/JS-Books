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

        }



    };




})();


//UICtrl.addItem("Run", "Morning run", 12);




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
                html = `<h2 class="run">${obj.desc} - ${obj.type} ${obj.dist} </h2>`;
            } else if (type === "Bike") {
                html = `<h2 class="bike">${obj.desc} - ${obj.type} ${obj.dist} </h2>`;
            } else if (type === "Swim") {
                html = `<h2 class="swim">${obj.desc} - ${obj.type} ${obj.dist} </h2>`;
               
            }

            document.querySelector(DOMStrings.data).insertAdjacentHTML("beforeend", html);
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
            console.log(data.desc); //object is rerturned
            
            let newActivity = UICtrl.addItem(data.type, data.desc, data.dist);
            console.log(newActivity); //undefined is returned
            
            DOMCtrl.addList(newActivity, data.type);
            
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
