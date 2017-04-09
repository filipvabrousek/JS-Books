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
const g = (name => `Hello ${name}`)("Filip");

console.log(g);


((name => {
    console.log(`Hello ${name}`);
}))("Filip");


//INTENTIONALY ATTACHING NAME TO GLOBAL OBJECT

(((global, name) => {
    const e = "Hello";
    e.greeting = "Hello!";
}))(window, "John");



















//CLOSURES - MAKE STANDALONE QUESTION
/*
After anonymous function returns, STH stays in memory
Then, after sayHi creates new execution content, and find STH sitting there
(due to SCOPE CHAIN, if variable isnt found in local function, it goes down in the scope chain and looks for it there)
*/

function greet(sth){
    return name => {
        console.log(`${sth} ${name}`);
    }
}

const sayHi = greet("Hi");
sayHi("Tony");


/*
After FOR LOOP returns, arr and i equal to 3 stays in memory
*/
function buildFunctions(){
    
    const arr = [];
    for (let i=0; i<3 ; i++){
        arr.push(
            () => {
                 console.log(i);
            }
        )
       
        
    }
    return arr; //after iterations in the FOR loop, i is 3
}


const fs = buildFunctions();



fs[0]();
fs[1]();
fs[2]();




function buildFunctions2(){
    
    const arr = [];
    
   for (let i = 0; i < 3; i++){
        arr.push(
            ((j => () => {
            console.log(j);
        })(i))
       
        )
    }
    return arr; //after iterations in the FOR loop, i is 3
}


const fs2 = buildFunctions2();



fs2[0]();
fs2[1]();
fs2[2]();



//FUNCTION FACTORIES

function makeGreeting(lang){
    return name => {
        
        if (lang === "en"){
            console.log(`Hello ${name}`);
        }
        
        if (lang === "es"){
            console.log(`Hola ${name}`);
        }
    }
    
}


makeGreeting("en")("Filip"); //Hello Filip


//CLOSURES AND CALLBACKS


function sayHiLater(){
    
    const g = "Hi";
    setTimeout(() => {
        console.log(g);
    }, 2000)
}

//sayHiLater();


function tellMeWhenDone(callback){

const a = 1000;
const b = 2000;
callback();
}


tellMeWhenDone(() => {
   console.log("I am done!");
});

tellMeWhenDone(() => {
   console.log("All done!");
});


console.log("----------------");














//CALL, BIND, APPLY - deciding what "this" will be = question?

const person = {
    first: "John",
    last: "Doe",
    fullName() {
        const full = `${this.first} ${this.last}`;
        return full;
    }

};



const log = function(a1, a2){
    console.log(`Logged: ${this.fullName()}`);
    console.log(`Arguments: ${a1} ${a2}`);
    console.log("----------------");
};


const logName = log.bind(person); // BIND - new function was created
logName("en");

log.call(person, "en", "es");
log.apply(person, ["en", "es"]);


const person2 = {
    first: "Jane",
    last: "Doe"
};

person.fullName.apply(person2);


//BIND function curying (creating copy of a function with some preset parameters)

function multiply(a, b){
    return a * b;
}

const multiplyByTwo = multiply.bind(this, 2); //.....bind(this, 2, 2) -> 4;
console.log(multiplyByTwo(4));

console.log("----------------");




//FUNCTIONAL PROGRAMMING = question?

function mapForEach(arr, fn){
    
  const newArr = [];
    for (let i = 0; i < arr.length; i++){
        newArr.push(
        fn(arr[i])
        )
    };
    return newArr;
}




const arr1 = [1, 2, 3];
console.log(arr1);

const arr2 = mapForEach(arr1, item => item * 2);
console.log(arr2);



const limit = (limiter, item) => item > limiter;


const arr4 = mapForEach(arr1, limit.bind(this, 1));
console.log(arr4);



const limitS = function(limiter){
    return (limiter, item) => item > limiter;
};


const arr5 = mapForEach(arr1, limitS(2));
console.log(arr5);




/* UNDERSCORE 
var arr6 = _.map(arr1, function(item){ return item * 3});
console.log(arr6);
var arr7 = _.filter([2, 3, 4, 5, 6, 7], function(item){ return item % 2 === 0});
console.log(arr7);
*/
