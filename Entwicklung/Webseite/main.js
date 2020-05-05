const myFunction = () => {
    let randomLorem = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "curabitur",
        "vel",
        "hendrerit",
        "libero",
        "eleifend",
        "blandit",
        "nunc",
        "ornare",
        "odio",
        "ut",
        "orci",
        "gravida",
        "imperdiet",
        "nullam",
        "purus",
        "lacinia",
        "a",
        "pretium",
        "quis",
        "congue",
        "praesent",
        "sagittis",
        "laoreet",
        "auctor",
        "mauris",
        "non",
        "velit",
        "eros",
        "dictum",
        "proin",
        "accumsan",
        "sapien",
        "nec",
        "massa",
        "volutpat",
        "venenatis",
        "sed",
        "eu",
        "molestie",
        "lacus",
        "quisque",
        "porttitor",
        "ligula",
        "dui",
        "mollis",
        "tempus",
        "at",
        "magna",
        "vestibulum",
        "Marco",
    ];

    let searchValue = document.getElementById("searchField").value.toLowerCase();

    document.getElementById("output").innerHTML = "";

    let foundElements = modiWords.filter(function(item) {
        if (item.toLowerCase().includes(searchValue)) {
            return item;
        }
    });

    let i = 0;
    let output = document.getElementById("output");
    foundElements.forEach(function(item) {
        i++;
        output.innerHTML += i + ") " + item + "<br>";
        output.style.borderStyle = "soild";
        output.style.borderColor = "black";
    });
    if (foundElements.length == 0) {
        output.style.borderStyle = "none";
        output.innerHTML = "Sorry, no elements found";
    }
};
const testFunc = () => {
    let str = "";
    console.log(typeof str);
    console.log(str.length);
};

function mixArray(array) {
    let backArray = [];
    const arrayLength = array.length;
    let upperRandom;
    let lowerRandom;
    for (let i = 0; i < arrayLength - 2; i++) {
        lowerRandom = Math.round(Math.random() * array.length - 2);
        console.log(lowerRandom);
        backArray.push(array.slice(lowerRandom, lowerRandom + 1));
        array.splice(lowerRandom, 1);
    }
    return backArray;
}
let syntaxRaw = [];

function getExclusion() {
    let exclusionField = document.getElementById('exclusionSymbols');
    let words = exclusionField.value.split('x');
    syntaxRaw = words.map(item => {
        return checkFor(item, 0, '');
    })
    console.log(syntaxRaw);
}

const checkFor = (item, i, syntax) => {
    if (i < 10) {
        for (let count of syntax) {
            if (item.endsWith(count)) {
                return checkFor(item.slice(0, item.length - 1), i + 1, syntax);
            }
            if (item.startsWith(count)) {
                return checkFor(item.slice(1, item.length), i + 1, syntax);
            }
        }
        console.log(item);
    } else {
        console.log(
            item + ":  There has bee an error, too many special characters!"
        );
    }
    return item;
};

let words = [];
let modiWords = [];
var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;

        words = text.split(" ");
        modiWords = words.map((item) => {
            return checkFor(item, 0, syntaxRaw);
        });
    };
    console.log('file' + syntaxRaw);
    console.log("Hello");
    reader.readAsText(input.files[0]);
    console.log(modiWords);
};