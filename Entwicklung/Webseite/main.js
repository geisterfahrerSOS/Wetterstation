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
  console.log(searchValue);
  let foundElements = randomLorem.filter(function (item) {
    // console.log(item);
    if (item.toLowerCase().includes(searchValue)) {
      return item;
    }
  });
  let i = 0;
  foundElements.forEach(function (item) {
    i++;
    document.getElementById("output").innerHTML += i + ") " + item + "<br>";
  });
  // let first = Math.round(document.getElementById("searchField").value);
  // console.log(first);
  // if (first < randomLorem.length) {
  //     for (let i = 1; i < first + 1; i++) {
  //         document.getElementById("outputField").innerHTML += i + ')  ' + randomLorem[i - 1] + "<br>";
  //     }
  // } else {
  //     document.getElementById("outputField").innerHTML = "There has been a Problem...<br>";
  // }
};
const testFunc = () => {
  let str = "";
  console.log(typeof str);
  console.log(str.length);
};

function mixArray(array) {
  let backArray = [];
  let text = "";
  const arrayLength = array.length;
  let i = 0;
  let upperRandom;
  let lowerRandom;
  for (let count = 0; i < arrayLength-2; i++) {
    lowerRandom = Math.round((Math.random() * array.length) - 2);
    console.log(lowerRandom);
    backArray.push(array.slice(lowerRandom, lowerRandom + 1));
    array.splice(lowerRandom, 1);
    
  }
  return backArray;
}
var openFile = function (event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function () {
    var text = reader.result;
    document.getElementById("output").innerHTML = text.slice(0, 20);
    let syntax = [".", ",", "!", "?", ":", ";", "(", ")", "[", "]"];
    let words = text.split(" ");
    let modiWords = words.map(item => {
        
      for (let count of syntax) {
        console.log("mosi"+syntax[count]);
        if (item.endsWith()) {
            console.log("endsWith");
          return item.slice(0, 2);
        }
        if (item.startsWith(syntax[count])) {
          return item.slice(1, 3);
        }
      }
      return item;
    });
    console.log(modiWords);
    // console.log(mixArray(modiWords));
  };
  reader.readAsText(input.files[0]);
};

function getLocalFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open(
    "GET",
    "file:///C:UsersmarcoDocumentsMarcoSchuleInformatikWetterstationWetterstationEntwicklungWebseite\text.txt",
    false
  );
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        alert(allText);
      }
    }
  };
  rawFile.send(null);
}
