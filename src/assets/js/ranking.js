document.getElementById("burger").addEventListener("click", function(){
  document.getElementById("wrapper").classList.toggle("link_wrapper_active");
});
document.getElementById("sidebar-burger").addEventListener("click", function(){
  document.querySelector(".page-wrapper").classList.toggle("sidebar-active")
});
function tabler() { 
  let jsonURL;
  let table = document.querySelector(".tb");
  // let jsonURL = document.querySelector(".tb").id;
  switch (table.id) { 
    //determines which button was pressed, passes the right json and array data
    case "uktb21":
      jsonURL = "/assets/json/pruk21.json";
      break;
    case "uktb22":
      jsonURL = "/assets/json/pruk22.json";
      break;
    case "scottb19":
      jsonURL = "/assets/json/prscot19.json";   
    default:
      console.log("nojson");
  }
  // ranking json handler
  // if first press:
  // - change array entry to disable loading json multiple times 
  // - populate table with json data
  // if (buttons[y] === undefined) { 
  //   buttons[y] = true;
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
}
tabler();
