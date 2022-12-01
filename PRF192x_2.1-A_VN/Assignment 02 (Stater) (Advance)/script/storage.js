"use strict";
// Chọn phần tử
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const sidebar = document.getElementById("sidebar");
const optionBreed = document.getElementById("input-breed");

//Khai báo biến
let petArr = getFromStorage("pet");
let breedArr = getFromStorage("breed");

//Lưu trữ dữ liệu trên máy
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Lấy dữ liệu
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

//Thêm hiệu ứng cho sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Kiểm tra pet ID - trả về vị trí nếu có
function checkID(petId) {
  if (petArr.length > 0) return petArr.findIndex((x) => x.id === petId);
  return -1;
}

//Xóa hết dữ liệu trên form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//Thêm option breed
function renderBreed(type) {
  optionBreed.innerHTML = "<option>Select Breed</option>";
  //Điều kiện khi sử dụng vs index và edit
  if (type != "") {
    let breedItem = breedArr.filter((x) => x.type === type);
    for (let i = 0; i < breedItem.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = breedItem[i].breed;
      optionBreed.appendChild(option);
    }
  }
  //Điều kiện khi sử dụng với search
  if (type === 0) {
    for (let i = 0; i < breedArr.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = breedArr[i].breed;
      optionBreed.appendChild(option);
    }
  }
}

//Hàm thay đổi danh sách breed khi chọn type
function changeBreed() {
  renderBreed(typeInput.value);
}
