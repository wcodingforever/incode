//***How to get the value of a attribute of an object?***

var person = {
    name: "Julia",
    sex: "Female"
};


//All these condes will print "Julia".
console.log(person["name"]); 
console.log(person.name);


var arr = ["julia", "Simon", "Robert"];

arr.map((elem, i)=>{
    console.log("elem: ", elem);
    console.log("i: ", i);
});