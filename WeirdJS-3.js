
//------------------DANGEROUS (editing __proto__)
var person = {
    first: "Default",
    last: "Default",
    
    getName() {
        return `${this.first} ${this.last}`;
    }
}



var filip = {
    first: "Filip",
    last: "Vabrousek"
}

//DONT DO THIS EVER!!!!!!!!)

filip.__proto__ = person;
console.log(filip.getName());


const jane = {
    first: "Jane"
};

jane.__proto__ = person;
console.log(jane.getName());

//!!!!!!!!!!!!!!!!!!!





//----------------LOOPS

for (const prop in jane){
    if (jane.hasOwnProperty("first")){
    console.log(`Prop: ${jane[prop]}`);
    }
}


const terezka = {
    adress: "111 Main st.",
    getFormalName() {
        return this.last + this.first;
    }
};




//-----------------STRING PROTOTYPE

String.prototype.isLengthGraterThan = function(limit){
    return this.length > limit;
}

console.log("Autobus".isLengthGraterThan(2));



/*
NEVER USE FOR/IN IN ARRAYS !!!!! (USE NORMAL FOR LOOP)
*/


//-------------------OBJECT.CREATE

var person = {
    name:"Default",
    greet() {
        return `Hi ${this.name}`;
    }
}


var filip = Object.create(person);
filip.name = "Filip";
console.log(filip.greet());
