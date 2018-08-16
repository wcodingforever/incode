var submitButton = document.querySelector("#submitbutton");
submitButton.disabled = true;
var title = document.querySelector("#title");
var dateFrom = document.querySelector("#datefrom");
var dateTo = document.querySelector("#dateto");
var level = document.querySelector("#level");
var description = document.querySelector("#description");
var dataset1 = document.querySelector("#dataset1");
var answer1 = document.querySelector("#answer1");
var dataset2 = document.querySelector("#dataset2");
var answer2 = document.querySelector("#answer2");
var dataset3 = document.querySelector("#dataset3");
var answer3 = document.querySelector("#answer3");
var dataset4 = document.querySelector("#dataset4");
var answer4 = document.querySelector("#answer4");
var dataset5 = document.querySelector("#dataset5");
var answer5 = document.querySelector("#answer5");
var datasets = document.querySelectorAll(".datatset");
var answers = document.querySelectorAll(".answer");
var allInputs = document.querySelectorAll("input")
var titleCheck = false;

console.log(allInputs);
for(var i = 0; i < allInputs.length; i++){
    console.log("each input");
    let thisInput = allInputs[i];
    thisInput.addEventListener("change", function(){
        console.log("got here", thisInput.value)
        if (thisInput !== ""){
            submitButton.disabled = false;
        }
    })
}


title.addEventListener("change", function(){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if(xhttp.responseText === "ERROR"){
                    alert("Name of puzzle already exist")
                    title.value = ""
                    titleCheck = false;
                }
                else
                    titleCheck = true;
            }
        };
        xhttp.open("POST", "../backend/puzzlesAPI.php",true);
        var thisTitle = {
            name: title.value
        }
        wantedTitle = JSON.stringify(thisTitle)
        xhttp.send(wantedTitle);
});

submitButton.addEventListener("click", function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText === "OK") alert("added new puzzle");
            else { alert("something went wrong"); }
        }
    };
    xhttp.open("POST", "../backend/puzzlesAPI.php");
    
    var puzzle = {
        name: title.value,
        date_from: dateFrom.value,
        date_to: dateTo.value,
        level: level.value,
        description: description.value,
        dataset1: dataset1.value,
        answer1: answer1.value,
        dataset2: dataset2.value,
        answer2: answer2.value,
        dataset3: dataset3.value,
        answer3: answer3.value,
        dataset4: dataset4.value,
        answer4: answer4.value,
        dataset5: dataset5.value,
        answer5: answer5.value
    }
    var sendPuzzle = JSON.stringify(puzzle);
    console.log(sendPuzzle)
    xhttp.send(sendPuzzle);
});