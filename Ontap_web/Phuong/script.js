"use strict";

let container = document.getElementById("container");
const btn_answer = document.querySelector(".answer");
const btn_closemodal = document.querySelector(".close_modal");
const modal = document.querySelector(".intro__header-content");
let count = 50;
for (var i = 0; i < 50; i++) {
  let leftSnow = Math.floor(Math.random() * container.clientWidth);
  let topSnow = Math.floor(Math.random() * container.clientHeight);
  let widthSnow = Math.floor(Math.random() * 50);
  let timeSnow = Math.floor(Math.random() * 5 + 5);
  let blurSnow = Math.floor(Math.random() * 10);
  console.log(leftSnow);
  let div = document.createElement("div");
  div.classList.add("snow");
  div.style.left = leftSnow + "px";
  div.style.top = topSnow + "px";
  div.style.width = widthSnow + "px";
  div.style.height = widthSnow + "px";
  div.style.animationDuration = timeSnow + "s";
  div.style.filter = "blur(" + blurSnow + "px)";
  container.appendChild(div);
}
// Tự động chơi nhạc
window.onload = function () {
  document.getElementById("myAudio").autoplay = true;
  document.getElementById("myAudio").load();
};
// Dieu khien modal
// Dong modal

btn_answer.addEventListener("click", function () {
  modal.classList.remove("hidden");
});
btn_closemodal.addEventListener("click", function () {
  modal.classList.add("hidden");
});
