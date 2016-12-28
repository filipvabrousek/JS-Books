   
    

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
    
    
    
/*----------------------------------------------------------STREET CLASS------------------------------------------------------------*/
class Street extends Element{
constructor(name, built, length, size){
    super(name, built);
    this.length = length;
    this.size = size;  
}
    
    classifyStreet() {
        const c = new Map();
        c.set(1, "tiny");
        c.set(2, "small");
        c.set(3, "normal");
        c.set(4, "big");
        c.set(5, "huge");
        console.log(`${this.name} built in ${this.built}, is a ${c.get(this.size)} street.`);
    }
}


/*-------------------------------------------------------------CONST-----------------------------------------------------------------*/


const allParks = [new Park("Central park", 1983, 6.1, 180), new Park("National park", 1937, 4.2, 190), new Park("Oak park", 1982, 3.8, 200)];
const allStreets = [new Street("Ocean avenue", 1947, 1.2, 7), new Street("Evergreen", 19297, 0.9, 8), new Street("Sunset", 1926, 7.8, 3)];
                 

/*-------------------------------------------------------------REPORTS-----------------------------------------------------------------*/

function calc(arr){
    const sum = arr.reduce((prev, cur, i) => prev + cur, 0);
    return [sum, sum / arr.length];
}






function reportParks(p){
 console.log("-------PARKS REPORT-------");
    
//density
p.forEach(el => el.treeDensity());
    
//average age
const ages = p.map(el => 2016 - el.built);
const [totalAge, avgAge] = calc(ages);
console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);

//Which park has more than 1000 trees
    
const i = p.map(el => el.treecount).findIndex(el =>  el >= 1000); //ERROR !!!!
console.log(`${p[i].name} has more than 1000 trees`);
}








function reportStreets(s){
 console.log("-------STREET REPORT-------");  
  
//total and average length
    
const [totalLength, avgLength] = calc(s.map(el => el.length));
console.log(`Our ${s.length} streets have a total length of ${totalLength} km with an average of  ${avgLength} kms.`);
    
//classify sizes
s.forEach(el => el.classifyStreet());
    
    
    
}

reportParks(allParks);
reportStreets(allStreets);
               
