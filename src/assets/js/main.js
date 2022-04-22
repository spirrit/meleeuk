// add players json imports, perhaps in a seperate file
//
//import rankingData from '../../players.json'
import boopSoundUrl from "../sound/boop.ogg";
import boingSoundUrl from "../sound/boing.ogg";

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
    sourceNode.connect(panNode).connect(gainNode).connect(audioCtx.destination);
    panNode.pan.value = panning;
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
    });
}
document.getElementById("feline").addEventListener("click", catMagic);


createBoopNode();
