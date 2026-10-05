// mobile menu toggle

var menuBtn = document.getElementById("menuBtn");
var navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});
