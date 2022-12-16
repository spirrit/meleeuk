import boopSoundUrl from "../sound/boop.ogg";

// infernal sfx javascript that brik helped me write
// needs a refactor/removal/documenting
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

const buttons = new Array(3);
var jsonURL;
function rankingButton() { 
  // gets the data needed to show ranking table and populate with player data
  var siblingTbl = this.parentNode.querySelector(".tb");
  switch (this.parentNode.id) { 
    //determines which button was pressed, passes the right json and array data
    case "pruk21":
      jsonURL = "/assets/json/pruk21.json";
      jsonBourne(siblingTbl, jsonURL, 0);
      break;
    case "pruk22":
      jsonURL = "/assets/json/pruk22.json";
      jsonBourne(siblingTbl, jsonURL, 1);
      break;
    case "prscot19":
      jsonURL = "/assets/json/prscot19.json";
      jsonBourne(siblingTbl, jsonURL, 2);    
    default:
      console.log("nojson");
  }
  tableToggle(siblingTbl);
}
function tableToggle(x) { 
  // toggle table display function
  if (x.style.display === "table") {
    x.style.display = "none";
  } else {
    x.style.display = "table";
  }
}
function jsonBourne(table, json, y) { 
  // ranking json handler
  // if first press:
  // - change array entry to disable loading json multiple times 
  // - populate table with json data
  if (buttons[y] === undefined) { 
    buttons[y] = true;
    fetch(json)
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
document.querySelectorAll(".tableheader").forEach(item => {item.addEventListener('click', rankingButton)});
createBoopNode();
