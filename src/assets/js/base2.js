document.getElementById("burger").addEventListener("click", function(){
  document.getElementById("wrapper").classList.toggle("link_wrapper_active");
});
document.getElementById("sidebar-burger").addEventListener("click", function(){
  document.querySelector(".page-wrapper").classList.toggle("sidebar-active")
});
document.getElementById("cat").addEventListener("click", function(){
  document.getElementById("cat").classList.add("rainbow");
  document.getElementById("catp").appendChild(document.createTextNode("meow"));
});