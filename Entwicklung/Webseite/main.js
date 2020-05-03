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
    document.getElementById("outputField").innerHTML = "";
    console.log(searchValue);
    let foundElements = randomLorem.filter(function(item) {
        // console.log(item);
        if (item.toLowerCase().startsWith(searchValue)) {
            return item;
        }
    });
    let i = 0;
    foundElements.forEach(function(item) {
        i++;
        document.getElementById("outputField").innerHTML +=
            i + ") " + item + "<br>";
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