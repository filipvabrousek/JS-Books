//AUTOMATIC SEMICOLON INSERTION (done by JS Engine)

function getPerson(){
    return //WILL AD " ; " HERE !!!!
    
    {
        first: "Tony"
    }
}

console.log(getPerson()); //UNDEFINED




//WHITESPACE (absolutely ignores comments)

//IIFE
var g = function(name){
    return "Hello " + name;
}("Filip");

console.log(g);


(function(name){
    console.log("Hello " + name);
})("Filip");


//INTENTIONALY ATTACHING NAME TO GLOBAL OBJECT

(function(global, name){
    var e = "Hello";
    e.greeting = "Hello!";
})(window, "John");



















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




function buildFunctions2(){
    
    var arr = [];
    
   for (var i = 0; i < 3; i++){
        arr.push(
            (function(j){
             return function(){
                 console.log(j);
             }
            }(i))
       
        )
    }
    return arr; //after iterations in the FOR loop, i is 3
}


var fs2 = buildFunctions2();



fs2[0]();
fs2[1]();
fs2[2]();



//FUNCTION FACTORIES

function makeGreeting(lang){
    return function(name){
        
        if (lang === "en"){
            console.log("Hello " + name);
        }
        
        if (lang === "es"){
            console.log("Hola " + name);
        }
    }
    
}


makeGreeting("en")("Filip"); //Hello Filip


//CLOSURES AND CALLBACKS


function sayHiLater(){
    
    var g = "Hi";
    setTimeout(function(){
        console.log(g);
    }, 2000)
}

//sayHiLater();


function tellMeWhenDone(callback){

var a = 1000;
var b = 2000;
callback();
}


tellMeWhenDone(function(){
   console.log("I am done!");
});

tellMeWhenDone(function(){
   console.log("All done!");
});


console.log("----------------");














//CALL, BIND, APPLY - deciding what "this" will be

var person = {
    first: "John",
    last: "Doe",
    fullName: function(){
        var full = this.first + " " + this.last;
        return full;
    }

}



var log = function(a1, a2){
    console.log("Logged: " + this.fullName());
    console.log("Arguments: " + a1 + " " + a2);
    console.log("----------------");
}


var logName = log.bind(person); // BIND - new function was created
logName("en");

log.call(person, "en", "es");
log.apply(person, ["en", "es"]);


var person2 = {
    first: "Jane",
    last: "Doe"
}

person.fullName.apply(person2);


//BIND function curying (creating copy of a function with some preset parameters)

function multiply(a, b){
    return a * b;
}

var multiplyByTwo = multiply.bind(this, 2); //.....bind(this, 2, 2) -> 4;
console.log(multiplyByTwo(4));














