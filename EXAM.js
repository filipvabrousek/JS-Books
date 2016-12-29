//+ARRAY METHODS, ARRAYS IN ES6, ARROW FUNCTIONS


var filip = {
name: "Filip",
age: 17,
presentation: function(style, timeOfTheDay){
    if (style === "formal"){
        console.log("Good " + timeOfTheDay + " ladies and gentlemen. I am " + this.name + " and I am " + this.age + " years old." );
    } else if (style === "friendly"){
        console.log("Hey whats up " + this.name + " ?. I am " + this.age + ". good " + timeOfTheDay);
    }
}
};

filip.presentation("friendly", "evening");




var terezka = {
name: "Terezka",
age: 18
};

var karel = {
name: "Karel",
age: 16
};




filip.presentation.call(terezka, "friendly", "morning");

filip.presentation.apply(karel, ["formal", "evening"]);


var filipFriendly = filip.presentation.bind(karel, "friendly");
filipFriendly("night");











//CLOSURES - MAKE STANDALONE QUESTION
/*
After anonymous function returns, STH stays in memory
Then, after sayHi creates new execution content, and find STH sitting there
(due to SCOPE CHAIN, if variable isnt found in local function, it goes down in the scope chain and looks for it there)
*/

function greet(sth){
    return function(name){
        console.log(sth + " " + name);
    }
}

var sayHi = greet("Hi");
sayHi("Tony");


/*
After FOR LOOP returns, arr and i equal to 3 stays in memory
*/
function buildFunctions(){
    
    var arr = [];
    for (var i=0; i<3 ; i++){
        arr.push(
            function(){
                 console.log(i);
            }
        )
       
        
    }
    return arr; //after iterations in the FOR loop, i is 3
}


var fs = buildFunctions();



fs[0]();
fs[1]();
fs[2]();








/*----------------------------------------------------------ELEMENT CLASS------------------------------------------------------------*/
class Element {
    constructor(name, built){
        this.name = name;
        this.buildYear = built;
    }
}
    
    
/*----------------------------------------------------------PARK CLASS------------------------------------------------------------*/
class Park extends Element{
    constructor(name, built, area, treecount){
        super(name, built);
        this.area = area; //km2
        this.treecount = treecount;
    }
    
    treeDensity(){
        const density = this.treecount / this.area;
        console.log(`${this.name} has tree density of ${density} trees per square km.`);
    }
}






