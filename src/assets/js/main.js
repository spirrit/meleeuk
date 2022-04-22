// add players json imports, perhaps in a seperate file
//
//import rankingData from '../../players.json'
import boopSoundUrl from '../sound/boop.ogg'
import boingSoundUrl from '../sound/boing.ogg'

const mrow = document.getElementById("feline");
const meow = document.getElementById("cat_container");
const cat = new Audio(boingSoundUrl);
function catMagic() {
  cat.play();
  meow.classList.add("dansen");
  mrow.classList.add("acid");
}
function youtube() {
  document.getElementById("ifr").src =
    "https://www.youtube-nocookie.com/embed/w3VQUEmsO8M?autoplay=1";
}

var audioCtx = new AudioContext();
const panNode = new StereoPannerNode(audioCtx, {
  pan: 0,
});
const gainNode = new GainNode(audioCtx, {
  gain: 0.4,
});
let audioBuffer = null
async function createBoopNode() {
  if (!audioBuffer) {
    console.log('No cached audio buffer. Fetching the file...')

    const response = await fetch(boopSoundUrl)
    const arrayBuffer = await response.arrayBuffer()
    const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    
    audioBuffer = decodedBuffer
  }
  
  const bufferSourceNode = audioCtx.createBufferSource()
  bufferSourceNode.buffer = audioBuffer

  return bufferSourceNode
}

function pageGrab() {
  createBoopNode().then(sourceNode => {
    sourceNode.connect(panNode).connect(gainNode).connect(audioCtx.destination)
    sourceNode.start(0)
  })
  var page = document.getElementsByClassName("page");
  for (var i = 0; i < page.length; i++) {
    page[i].style.display = "none";
  }
}
function changeHome() {
  panNode.pan.value = -0.5
  pageGrab();
  document.getElementById("home").style.display = "block";
}
function changeRanking() {
  panNode.pan.value = -0.25
  pageGrab();
  document.getElementById("ranking").style.display = "block";
}
function changeLinks() {
  panNode.pan.value = 0.25
  pageGrab();
  document.getElementById("links").style.display = "block";
}
function changeOther() {
  panNode.pan.value = 0.5
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


createBoopNode();