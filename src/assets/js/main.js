// add players json imports, perhaps in a seperate file
//
//import rankingData from '../../players.json'
const mrow = document.getElementById("feline");
const meow = document.getElementById("cat_container");
const cat = new Audio("assets/boing.ogg");
function boing() {
  cat.play();
}
function catMagic() {
  boing();
  meow.classList.add("dansen");
  mrow.classList.add("acid");
}
function youtube() {
  document.getElementById("ifr").src =
    "https://www.youtube-nocookie.com/embed/w3VQUEmsO8M?autoplay=1";
}
function pageGrab() {
  var page = document.getElementsByClassName("page");
  for (var i = 0; i < page.length; i++) {
    page[i].style.display = "none";
  }
}
function changeHome() {
  pageGrab();
  document.getElementById("home").style.display = "block";
}
function changeLinks() {
  pageGrab();
  document.getElementById("links").style.display = "block";
}
function changeRanking() {
  pageGrab();
  document.getElementById("ranking").style.display = "block";
}
function changeOther() {
  pageGrab();
  document.getElementById("other").style.display = "block";
}
function changeSecret() {
  youtube();
  pageGrab();
  document.getElementById("secret").style.display = "block";
}
document.querySelectorAll(".navlink")[0].addEventListener("click", changeHome);
document
  .querySelectorAll(".navlink")[1]
  .addEventListener("click", changeRanking);
document.querySelectorAll(".navlink")[2].addEventListener("click", changeLinks);
document.querySelectorAll(".navlink")[3].addEventListener("click", changeOther);
document.getElementById("feline").addEventListener("click", catMagic);
