// The contact form validation

var contactForm = document.getElementById("contactForm");
var formMessage = document.getElementById("formMessage");

var name = document.getElementById("name");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var message = document.getElementById("message");

var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var phonePattern = /^[0-9]+$/;

function showError(input, errorId) {
  input.classList.add("invalid");
  document.getElementById(errorId).style.display = "block";
}

function hideError(input, errorId) {
  input.classList.remove("invalid");
  document.getElementById(errorId).style.display = "none";
}


function checkName() {
  if (name.value.trim() === "") {
    showError(name, "nameError");
    return false;
  }
  hideError(name, "nameError");
  return true;
}

function checkEmail() {
  if (email.value.trim() === "" || !emailPattern.test(email.value.trim())) {
    showError(email, "emailError");
    return false;
  }
  hideError(email, "emailError");
  return true;
}

function checkPhone() {
  if (phone.value.trim() === "" || !phonePattern.test(phone.value.trim())) {
    showError(phone, "phoneError");
    return false;
  }
  hideError(phone, "phoneError");
  return true;
}

function checkMessage() {
  if (message.value.trim() === "") {
    showError(message, "messageError");
    return false;
  }
  hideError(message, "messageError");
  return true;
}

name.addEventListener("input", checkName);
name.addEventListener("blur", checkName);

email.addEventListener("input", checkEmail);
email.addEventListener("blur", checkEmail);

phone.addEventListener("input", checkPhone);
phone.addEventListener("blur", checkPhone);

message.addEventListener("input", checkMessage);
message.addEventListener("blur", checkMessage);

// validate everything when the form is submitted
function validateForm(e) {
  e.preventDefault();

  var nameOk = checkName();
  var emailOk = checkEmail();
  var phoneOk = checkPhone();
  var messageOk = checkMessage();

  if (nameOk && emailOk && phoneOk && messageOk) {
    formMessage.className = "success";
    formMessage.textContent = "Thanks " + name.value.trim() + ", your message has been sent!";
    contactForm.reset();
  } else {
    formMessage.className = "";
  }
}

contactForm.addEventListener("submit", validateForm);
