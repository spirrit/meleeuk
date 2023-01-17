const table = document.getElementById("ranktb");
let btn = document.querySelectorAll(".btn");
const buttons = Array.from(btn);
const tableLoad = [false,false,false];
const tables = new Array(3);
let jsonURL;
let active;

function tabler(id) { 
  switch (id.id) { 
    //determines which button was pressed, passes the right json, array and button data
    case "uk22":
      active = 0;
      jsonURL = "/assets/json/pruk22.json";
      break;    
    case "uk21":
      active = 1;
      jsonURL = "/assets/json/pruk21.json";
      break;
    case "uk19":
      active = 2;
      jsonURL = "/assets/json/pruk19.json";
      break;
    case "scot22":
      active = 0;
      jsonURL = "/assets/json/prscot22.json";
      break;
    case "scot19":
      active = 1;
      jsonURL = "/assets/json/prscot19.json";
      break;
    default:
      console.log("nojson");
  }
  buttonHandler(active);
  jsonHandler(active, jsonURL);
}
function buttonHandler(active) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("current");
  }
  switch (active) {
    case 0:
      buttons[0].classList.add("current");
      break;
    case 1:
      buttons[1].classList.add("current");
      break;
    case 2:
      buttons[2].classList.add("current");
  };
}
function jsonHandler(arr, json) {
  table.replaceChildren();
  table.innerHTML = "<thead><tr><th class=\"play\">Player</th><th class=\"rank\"></th><th class=\"move\">+/-</th><th class=\"char\">Char/s</th></tr></thead>";
  if (tableLoad[arr] == false) {
    tableLoad[arr] = true;
    jsonBourne(arr, json);
  }
  else {
    renderJson(tables[arr]);
  }
}
function jsonBourne(active, json) {
  fetch(json)
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        tables[active] = apiJsonData;
        renderJson(tables[active]);
    })
}
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

let x = 0;
document.querySelectorAll(".btn").forEach(item => {
  let y = x++;
  item.addEventListener('click', function(){tabler(buttons[y])});
});
tabler(buttons[0]);