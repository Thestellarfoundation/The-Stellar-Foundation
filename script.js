document.addEventListener("DOMContentLoaded", function () {

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

emailjs.init("ILYtAj3_oxjdKqvgj");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {

e.preventDefault();

emailjs.sendForm("service_zt0cgq9","template_q3dazye",this)

.then(function(){
alert("Message sent successfully!");
form.reset();
})

.catch(function(error){
alert("Failed to send message.");
console.log(error);
});

});

});

