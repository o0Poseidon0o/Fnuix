"use strict";
const mainContainer = document.getElementById("main-container"); // Lấy ID
const container = document.querySelector(".container"); //lấy class
const submit = document.querySelector(".show-modal");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const element = document.getElementsByTagName("h1"); //Lấy tất cả các thẻ h1 sẽ trả về một Array
submit.addEventListener("click", function () {
  modal.classList.remove("hidden"); //Thêm hoặc bỏ class
  closeModal.classList.remove("hidden");
});
closeModal.addEventListener("click", function () {
  closeModal.classList.add("hidden");
  modal.classList.add("hidden");
});
mainContainer.style.display = "grid"; //Thay đổi thuộc tính CSS 1 class
console.log(element);
element[0].style.color = "red"; //Hiện có 2 thẻ h1 và lấy phần tử đầu tiên của h1
const containerMore = document.getElementById("container-more");
containerMore.innerHTML = `<p>Thưc hiện thêm 1 thẻ html</p>`;
const mylist = document.getElementById("mylist"); //lấy thẻ ID my list

let newListItem = document.createElement("li"); //Tạo thẻ li
newListItem.textContent = "Banana"; //Thểm thẻ li vào ul
mylist.appendChild(newListItem);
