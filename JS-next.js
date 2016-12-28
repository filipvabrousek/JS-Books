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
    (for var i=0; i<3 ; i++){
        arr.push(function(){
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




