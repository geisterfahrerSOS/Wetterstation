var myChart;
let d = new Date();
let monthArray = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "October", "]November", "Dezemmber"];
let date = document.getElementsByClassName("datePeriod");
date.innerHTML = d.getDate()*".  "+ d.getMonth()+ ", "+ d.getYear();
let created = false;
let timeFrameValue = 2;



displayGraph();
getSelection();
let arrows = [];
for (let i = 1; i < 3; i += 2) {
  arrows.push(document.getElementsByClassName("changeDateWrapper")[0].childNodes[i]);
}
console.log(arrows);
for(let i = 0; i < arrows.length; i++){
  let item = arrows[i];
  item.addEventListener("click", event => {
    console.log(item.firstChild);
  })
}

function getSelection() {
  let checkBoxes = document.getElementsByClassName("checkBoxWrapper")[0]
    .childNodes;
  let checkBoxValues = [];
  for (let i = 1; i < 9; i += 2) {
    checkBoxValues.push(checkBoxes[i].getElementsByTagName("input")[0].checked);
  }
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
      timeFrameValue = i;
    });
  }
  return{
    checkBoxValues: checkBoxValues,
    timeFrameValue: timeFrameValue,
  }
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
  if (created) {
    myChart.destroy();
  }
  displayGraph();
  console.log(getSelection());
}

function displayGraph() {
  var ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3, 9, 7, 13],
          borderWidth: 1,
        },
        {
          label: "# of Votes",
          data: [10, 5, 8, 2, 11, 13, 20, 10, 13],
          borderWidth: 1,
        },
      ],
      backgroundColor: [rgb()],
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
  created = true;
}
