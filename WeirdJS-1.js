/*------------------------------------------2-----------------------------------------*/
var a;

//do === doesnt allow coercion
if (a === undefined){
    console.log("a is undefined");
} else {
    console.log("a is defined");
}



   const o = {
        first: "Filip"
    };

   console.log(JSON.stringify(o));

const JSONvalue = JSON.parse(`{"first": "Filip"}`);
console.log(JSONvalue);




console.log("-------------");
//*------------------------------------------4-----------------------------------------*/
const Filip = {
    first: "Filip",
    last: "Vabrousek",
    
    adress: {
        street: "111 Ave",
        city: "London"
    }
};




function greet(person){
    console.log(`Hi ${person.first}`);
    
}


greet(Filip);


//Functions are objects
function g(){
    console.log("hi");
}

g.lang = "English";
console.log(g.lang);


console.log("-------------");
// expressions
//a() -> Error!

 function log(a){
   a();
}

log(() => {
    console.log("hi");
});




//---Passing by value X by reference
//---BY VALUE (primitives)

var a = 3;
var b;

b = a; 
a = 2;

console.log(a); //2
console.log(b); //3


//---BY REFRENCE (pointing at the same object in memory)
var c = {greeting: "hi"};
let d;

d = c;
c.greeting = "Hello!";
console.log(c); //Hello!
console.log(d); //Hello!

function changeGreeting(obj){
    obj.greeting = "Hola";
}

changeGreeting(d);
console.log(c);
console.log(d);


c = { greeting: "howdy"};
console.log(c);
console.log(d);



console.log("----------------------------");
//--------THIS (new gets attached to the global object)


function F(){
    console.log(this);
    this.newq = "Hello";
}

var b = function(){
console.log(this);
}

F();
console.log(newq);
b();

var c = {
 name: "The c object",

    log() {
    const self = this;
        
    self.name = "Updated";
    console.log(self);
        
    const setname = newname => {
        self.name = newname;
    };
    setname("Updated again!");
    console.log(self);
}
    
}

c.log();



//ARRAY WITH FUNCTION INSIDE

const arr = [1,
           false,
           {
    name: "Filip",
    adress: "111 Main st." 
},
           
name => {
const g = "Hello ";
console.log(g +  name);
           }
];


console.log(arr);
arr[3](arr[2].name);



//ARGUMENTS AND SPREAD

function gr(first, lang="en", ...other) {
    if (arguments.length  === 0){
        console.log("no parameters");
        return;
    }
    console.log(first);
    console.log(lang);
    console.log(`arg 0 ${arguments[0]}`);
    console.log("------");
}
gr("Filip");



//FUNCTION OVERLOADING
function G(name, lang="en") {
    if (lang === "en"){
        console.log(`Hello ${name}`);
    }

    if (lang === "es"){
        console.log(`Holla ${name}`);
    }
}

function GE(name){
    G(name, "en");
}

GE("Filip");


//CONTINUE IN THE NEXT FILE BY 41
