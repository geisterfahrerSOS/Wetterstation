var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [],
  },
  options: {
    scales: {
      yAxes: [],
      xAxes: [{
        fontSize: 40,
        ticks: {
          min: 20,
          max: 100,
            callback: function (value, index, values) {
              return "Hello"+ value;
            },
        }
    }]
    },
  },
});
let dataSets = [
  {
    label: "Temperatur",
    yAxisID: "A",
    data: [],
    borderWidth: 1,
    borderColor: "red",
    fill: false,
  },
  {
    label: "Luftfeuchtigkeit",
    yAxisID: "B",
    data: [],
    borderWidth: 1,
    borderColor: "yellow",
    fill: false,
  },
  {
    label: "Windgeschwindigkeit",
    yAxisID: "C",
    data: [],
    borderWidth: 1,
    borderColor: "blue",
    fill: false,
  },
  {
    label: "Windrichtung",
    yAxisID: "D",
    data: [],
    borderWidth: 1,
    borderColor: "green",
    fill: false,
  },
];
let yAxes = [
  {
    id: "A",
    type: "linear",
    position: "left",
    labelString: "Grad Celsius",
    ticks: {
      min: -10,
      max: 50,
      callback: function (value, index, values) {
        return value + "°C";
      },
    },
  },
  {
    id: "B",
    type: "linear",
    position: "left",
    ticks: {
      min: 0,
      max: 100,
      callback: function (value, index, values) {
        return value + "%";
      },
    },
    labelString: "Prozent Luffeuchte",
  },
  {
    id: "C",
    type: "linear",
    position: "right",
    labelString: "Windgeschwindigkeit",
    ticks: {
      min: 0,
      max: 80,
      callback: function (value, index, values) {
        return value + "Km/h";
      },
    },
  },
  {
    id: "D",
    type: "linear",
    position: "right",
    labelString: "Windrichtung",
    ticks: {
      min: 0,
      max: 360,
      callback: function (value, index, values) {
        return value + "°";
      },
    },
  },
];
let d = new Date();
let monthArray = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "October",
  "]November",
  "Dezemmber",
];
let weekDays = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];
let date = document.getElementsByClassName("datePeriod");
date.innerHTML = d.getDate() * ".  " + d.getMonth() + ", " + d.getYear();

getData();
refresh();
initListeners();



// let arrows = [];
// for (let i = 1; i < 3; i += 2) {
//   arrows.push(
//     document.getElementsByClassName("changeDateWrapper")[0].childNodes[i]
//   );
// }
// console.log(arrows);
// for (let i = 0; i < arrows.length; i++) {
//   let item = arrows[i];
//   item.addEventListener("click", (event) => {
//     console.log(item.firstChild);
//   });
// }
function getData() {
  //Hourly Data
  let tempArray = [];
  let humidArray = [];
  let windArray = [];
  let windDirArray = [];
  for (let i = 0; i < 8760; i++) {
    if (i === 0) {
      tempArray.push(20 + 5 * (Math.random() - 0.5));
      humidArray.push(70 + 10 * (Math.random() - 0.5));
      windArray.push(5 + 4 * (Math.random() - 0.5));
      windDirArray.push(Math.abs(100 + 30 * (Math.random() - 0.5)) % 360);
    }
    tempArray.push(tempArray[i - 1] + 5 * (Math.random() - 0.5));
    humidArray.push(humidArray[i - 1] + 5 * (Math.random() - 0.5));
    windArray.push(windArray[i - 1] + 5 * (Math.random() - 0.5));
    windDirArray.push(
      Math.abs(windDirArray[i - 1] + 30 * (Math.random() - 0.5)) % 360
    );
  }
  dataSets[0].data = tempArray;
  dataSets[1].data = humidArray;
  dataSets[2].data = windArray;
  dataSets[3].data = windDirArray;
}
function initListeners() {
  let timeFrame = [];
  timeFrame.push(
    document.getElementsByClassName("timeFrameSwitch")[0].childNodes[1]
  );
  timeFrame.push(
    document.getElementsByClassName("timeFrameSwitch")[0].childNodes[3]
  );
  timeFrame.push(
    document.getElementsByClassName("timeFrameSwitch")[0].childNodes[5]
  );
  for (let i = 0; i < timeFrame.length; i++) {
    let item = timeFrame[i];
    item.addEventListener("click", (event) => {
      for (let count of timeFrame) {
        count.style.backgroundColor = "white";
        count.style.color = "black";
      }
      item.style.backgroundColor = "grey";
      item.style.color = "white";
    });
  }
}
function getSelection() {
  let checkBoxes = document.getElementsByClassName("checkBoxWrapper")[0]
    .childNodes;
  let checkBoxValues = [];
  for (let i = 1; i < 9; i += 2) {
    checkBoxValues.push(checkBoxes[i].getElementsByTagName("input")[0].checked);
  }
  let timeFrameValue;
  let timeFrame = [];
  timeFrame.push(
    document.getElementsByClassName("timeFrameSwitch")[0].childNodes[1]
  );
  timeFrame.push(
    document.getElementsByClassName("timeFrameSwitch")[0].childNodes[3]
  );
  timeFrame.push(
    document.getElementsByClassName("timeFrameSwitch")[0].childNodes[5]
  );
  for (let i = 0; i < timeFrame.length; i++) {
    if (timeFrame[i].style.backgroundColor === "grey") {
      timeFrameValue = i;
      break;
    }
  }

  return {
    checkBoxValues: checkBoxValues,
    timeFrameValue: timeFrameValue,
  };
}

function graphEditor(selection) {
  // Different Datasets
  while (myChart.data.datasets.length > 0) {
    myChart.data.datasets.pop();
    myChart.options.scales.yAxes.pop();
  }
  for (let i = 0; i < selection.checkBoxValues.length; i++) {
    if (selection.checkBoxValues[i]) {
      console.log("Push" + i);
      myChart.data.datasets.push(dataSets[i]);
      myChart.options.scales.yAxes.push(yAxes[i]);
    }
  }
  // Labels
  while (myChart.data.labels.length > 0) {
    myChart.data.labels.pop();
  }
  switch (selection.timeFrameValue) {
    case 0:
      for (let i = 0; i < 25; i++) {
        if (i / 10 >= 1) {
          myChart.data.labels.push(i + ":00");
        } else {
          myChart.data.labels.push("0" + i + ":00");
        }
      }
      break;
    case 1:
      for (let i = 1; i < 169; i++) {
        //change Date depending on month
        myChart.data.labels.push(i);
      }
      break;
    case 2:
      for (let i = 1; i < 31; i++) {
        myChart.data.labels.push(i);
      }
      break;

    default:
      break;
  }

  myChart.update();
}

function getXML() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhttp.responseText;
      let totalValues = data.split(",");
    }
  };
  xhttp.open("GET", "text.txt", true);
  xhttp.send();
}

function refresh() {
  console.log("refreshing");
  myChart.destroy();
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      datasets: [],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  console.log(getSelection());
  graphEditor(getSelection());
  console.log(myChart);
}

function displayGraph() {
  var ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      datasets: [],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
