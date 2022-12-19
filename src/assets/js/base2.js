document.getElementById("burger").addEventListener("click", function(){
  document.getElementById("wrapper").classList.toggle("link_wrapper_active");
});
document.getElementById("cat").addEventListener("click", function(){
  document.getElementById("cat").classList.add("rainbow");
  document.getElementById("catp").appendChild(document.createTextNode("meow"));
});