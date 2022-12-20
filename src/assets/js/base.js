document.getElementById("burger").addEventListener("click", function(){
  document.getElementById("wrapper").classList.toggle("link_wrapper_active");
});
document.getElementById("sidebar-burger").addEventListener("click", function(){
  document.querySelector(".page-wrapper").classList.toggle("sidebar-active")
});