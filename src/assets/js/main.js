import boopSoundUrl from "../sound/boop.ogg";

let audioCtx = new AudioContext();
let gainNode = new GainNode(audioCtx, {
  gain: 0.15,
});
let audioBuffer = null;
async function createBoopNode() {
  if (!audioBuffer) {
    console.log("No cached audio buffer. Fetching the file...");
    const response = await fetch(boopSoundUrl);
    const arrayBuffer = await response.arrayBuffer();
    const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    audioBuffer = decodedBuffer;
  }
  const bufferSourceNode = audioCtx.createBufferSource();
  bufferSourceNode.buffer = audioBuffer;
  return bufferSourceNode;
}
function changePage(pageName, panning) {
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "block";
  createBoopNode().then((sourceNode) => {
    sourceNode.connect(gainNode).connect(audioCtx.destination);
    sourceNode.start(0);
  });
}
const navData = [
  ["home", -0.5],
  ["ranking", -0.25],
  ["links", 0.25],
  ["other", 0.5],
];
for (let i = 0; i < navData.length; i++) {
  const navCurrentPage = navData[i];
  document
    .getElementById("nav" + navCurrentPage[0])
    .addEventListener("click", function () {
      changePage(navCurrentPage[0], navCurrentPage[1]);
      document.getElementById("wrapper").classList.remove("link_wrapper_active");
    });
}
document.getElementById("burger").addEventListener("click", function(){
  document.getElementById("wrapper").classList.toggle("link_wrapper_active");
});

var jsonURL;

function toggler() { //toggles display of sibling table
  var tbSelecta = this.parentNode.querySelector(".tb");
  
  switch (this.parentNode.id) { //determines which button was pressed, passes the right json
    case "legendsection":
      jsonURL = "";
      jsonBourne(tbSelecta, jsonURL);
    case "pruk21":
      jsonURL = "/assets/json/pruk21.json";
      jsonBourne(tbSelecta, jsonURL);
      break;
    case "pruk22":
      jsonURL = "/assets/json/pruk22.json";
      jsonBourne(tbSelecta, jsonURL);
      break;
    case "prscot19":
      jsonURL = "/assets/json/prscot19.json";
      jsonBourne(tbSelecta, jsonURL);
  }

  function jsonBourne(table, jsonURL) { 
    if (table.getElementsByTagName("tr").length < 2) { // if first press => populate table with json data
      fetch(jsonURL)
        .then(function (response) {
            return response.json();
        }).then(function (apiJsonData) {
            console.log(apiJsonData);
            renderJson(apiJsonData);
        })
      function renderJson(players) {
        players.forEach(entry => {
            let newRow = document.createElement("tr");
            Object.values(entry).forEach((value) => {
                let cell = document.createElement("td");
                cell.innerHTML = value;
                newRow.appendChild(cell);
            })
            table.appendChild(newRow);
        });
      };
    };
  }
  console.log(this.parentNode.id); // toggle table display [they start as display:none]
  if (tbSelecta.style.display === "table") {
    tbSelecta.style.display = "none";
  } else {
    tbSelecta.style.display = "table";
  }
}









document.querySelectorAll(".tableheader").forEach(item => {
  item.addEventListener('click', toggler)
})


//var tableArray = document.getElementsByClassName("prTable");



createBoopNode();
