"use strict";
const submit = document.querySelector(".btn-doom");
const doom = document.querySelector(".doom");

submit.addEventListener("click", function () {
  doom.classList.remove("hidden");
});
