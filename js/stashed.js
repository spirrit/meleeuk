let = document.getElementsByClassName("page");
navHome = document.getElementById("navhome")
navRanking = document.getElementById("navranking")
navLinks = document.getElementById("navlinks")
navOther = document.getElementById("navother")
navSecret = document.getElementById("navsecret")

function navIndicate() {
  if (document.getElementById("home").style.display = "block") {
    navHome.style.cssText = "font-family: 'Open Sans', sans-serif;background: #ffffff;color: #000000;border: 1px solid #555555;margin-right: 1px;cursor: pointer;"
  }
}

//function pageLoad() {
//	if (window.location.pathname == "/ranking") {
//		changeRanking();
//	} else if (window.location.pathname == "/links") {
//		changeLinks();
//	} else if (window.location.pathname == "/other") {
//		changeOther();
//	}};
//
//pageLoad();

function youtube() {
  document.getElementById("ifr").src="https://www.youtube-nocookie.com/embed/w3VQUEmsO8M?autoplay=1";
}

function changeHome() {
  page[0].style.display = "none";
  document.getElementById("home").style.display = "block";
  
};
function changeLinks() {
  page[0].style.display = "none";
  document.getElementById("links").style.display = "block";
  let = document.getElementsByClassName("page")[0];
};
function changeRanking() {
  page[0].style.display = "none";
  document.getElementById("ranking").style.display = "block";
  let = document.getElementsByClassName("page")[0];
};
function changeOther() {
  page[0].style.display = "none";
  document.getElementById("other").style.display = "block";
  let = document.getElementsByClassName("page")[0];
};
function changeSecret() {
  youtube();
  page[0].style.display = "none";
  document.getElementById("secret").style.display = "block";
  let = document.getElementsByClassName("page")[0];
};