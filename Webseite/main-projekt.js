let projektContents = [];
getXML("projekt/lucasContent.txt", 0);
getXML("projekt/maxContent.txt", 1);
getXML("projekt/marcoContent.txt", 2);
let sorted = [];

function getXML(link, index) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = xhttp.responseText;
            projektContents.push([data, index]);
            if (projektContents.length === 3) {
                sort(projektContents);
                updateProjekt();
            }
        }
    };
    xhttp.open("GET", link, true);
    xhttp.send();
}

function sort(array) { //wäre bestimmt auch rekursiv gegangen :-)
    for (let count of array) {
        if (count[1] === 0) {
            console.log("first");
            sorted.push(count[0]);
            for (let count1 of array) {
                if (count1[1] === 1) {
                    console.log("first");
                    sorted.push(count1[0]);
                    for (let count2 of array) {
                        if (count2[1] === 2) {
                            console.log("first");
                            sorted.push(count2[0]);
                        }
                    }
                }
            }
        }
    }
}
let chooserChildren = [];
chooserChildren.push(
    document.getElementsByClassName("projektChooser")[0].childNodes[1]
);
chooserChildren.push(
    document.getElementsByClassName("projektChooser")[0].childNodes[3]
);
chooserChildren.push(
    document.getElementsByClassName("projektChooser")[0].childNodes[5]
);
console.log(chooserChildren);
for (let item of chooserChildren) {
    item.addEventListener("click", function() {
        for (let item of chooserChildren) {
            item.style.borderColor = "transparent";
        }
        console.log(item);
        item.style.borderColor = "white";
        updateProjekt();
    });
}

function updateProjekt() {
    let select;
    for (let i = 0; i < 3; i++) {
        if (chooserChildren[i].style.borderColor === "white") {
            select = i;
        }
    }
    console.log(sorted);
    document.getElementsByClassName("projektContent")[0].innerHTML =
        sorted[select];
}
// document.getElementsByClassName("marcoProjekt")[0].style.borderColor = "orange";
// console.log(chooserChildren[5].style.borderColor);



let element = document.getElementsByClassName("myElement")[0];