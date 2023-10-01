import * as twitter from "./twitter.js";
const table = document.getElementById("ranktb");
let btn = document.querySelectorAll(".btn");
const buttons = Array.from(btn);
const tableLoad = [false,false,false,false];
const tables = new Array(3);
let jsonURL;
let active;
let img;
let imgxl;

function tabler(id) { 
  switch (id.id) { 
    //determines which button was pressed, passes the right json, array and button data
    case "uk19":
      active = 0;
      jsonURL = "/assets/json/pruk19.json";
      img = "/assets/img/pruk19ws.jpg";
      imgxl = "/assets/img/pruk19w.jpg";
      break;
    case "uk21":
      active = 1;
      jsonURL = "/assets/json/pruk21.json";
      img = "/assets/img/pruk21s.jpg";
      imgxl = "/assets/img/pruk21.jpg";
      break;
    case "uk22":
      active = 2;
      jsonURL = "/assets/json/pruk22.json";
      img = "/assets/img/pruk22s.jpg";
      imgxl = "/assets/img/pruk22.jpg";
      break;    
    case "uk23":
      active = 3;
      jsonURL = "/assets/json/pruk23.json";
      img = "/assets/img/pruk23s.jpg";
      imgxl = "/assets/img/pruk23.jpg";
      break;    


    case "scot19":
      active = 0;
      jsonURL = "/assets/json/prscot19.json";
      img = "/assets/img/prscot19s.jpg";
      imgxl = "/assets/img/prscot19.jpg";
      break;
    case "scot22":
      active = 1;
      jsonURL = "/assets/json/prscot22.json";
      img = "/assets/img/prscot22s.jpg";
      imgxl = "/assets/img/prscot22.jpg";
      break;

    case "wales22":
      active = 0;
      jsonURL = "/assets/json/prwales22.json";
      img = "/assets/img/prwales22s.jpg";
      imgxl = "/assets/img/prwales22.jpg";
      break;
    case "wales23":
      active = 1;
      jsonURL = "/assets/json/prwales23.json";
      img = "/assets/img/prwales23s.jpg";
      imgxl = "/assets/img/prwales23.jpg";
      break;

    default:
      console.log("nojson");
  }
  let twt = id.id;
  document.getElementById("overlay").href=imgxl;
  document.getElementById("rankp").innerHTML = twitter[twt];
  document.getElementById("rankimg").src=img;
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
      break;
    case 3:
      buttons[3].classList.add("current");
  };
}
function jsonHandler(arr, json) {
  table.replaceChildren();
  table.innerHTML = "<thead><tr><th class=\"rank\"></th><th class=\"play\">Player</th><th class=\"move\">+/-</th><th class=\"char\">Char/s</th></tr></thead>";
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
      
      if (value == entry.char) {
        const charArray = value.split("/");
        charArray.forEach((char) => {
          let charImg = document.createElement("div");
          charImg.classList.add("chars");
          charSelect(char, charImg);
          cell.appendChild(charImg);
        });
        cell.classList.add("ch");
        
        
      }
      else {
        cell.innerHTML = value;
      }
      // console.log(charImg);
      newRow.appendChild(cell);
    })
    if (typeof entry.rank === "string") {
      table.appendChild(newRow).classList.add("hm");
    }
    else {
      table.appendChild(newRow);
    }


  });
};

let x = 0;
document.querySelectorAll(".btn").forEach(item => {
  let y = x++;
  item.addEventListener('click', function(){tabler(buttons[y])});
});
tabler(buttons[buttons.length - 1]);


function charSelect(charData, cell) {
  switch (charData) {
    case "Fox":
      cell.style.backgroundPosition = "0 0";
      break;
    case "Marth":
      cell.style.backgroundPosition = "-24px 0";
      break;
    case "Sheik":
      cell.style.backgroundPosition = "48px 0";
      break;
    
    case "Falco":
      cell.style.backgroundPosition = "24px -24px";
      break;
    
    case "C.Falcon":
      cell.style.backgroundPosition = "24px 0";
      break;
    case "Puff":
      cell.style.backgroundPosition = "48px -24px";
      break;
    case "Pikachu":
      cell.style.backgroundPosition = "0 48px";
      break;
    case "Peach":
      cell.style.backgroundPosition = "48px -48px";
      break;
    case "G&W":
      cell.style.backgroundPosition = "-24px 24px";
      break;
    case "Samus":
      cell.style.backgroundPosition = "48px 24px";
      break;
    case "ICs":
      cell.style.backgroundPosition = "0 -24px";
      break;
    case "Dr.Mario":
      cell.style.backgroundPosition = "0 24px";
      break;
    case "Luigi":
      cell.style.backgroundPosition = "24px 48px";
      break;
    case "Ganondorf":
      cell.style.backgroundPosition = "-24px -24px";
      break;
    case "Samus":
      cell.style.backgroundPosition = "48px 24px";
      break;
    case "Zelda":
      cell.style.backgroundPosition = "-24px 48px";
      break;
    case "DK":
      cell.style.backgroundPosition = "-72px -72px";
      break;
    
    default:
      cell.style.backgroundPosition = "-72px -72px";
      break;

  }
}
