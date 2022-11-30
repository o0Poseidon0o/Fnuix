"use strict";
const userArr = getFromStorage("userArr");
// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Hàm lưu dữ liệu
function saveTostorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// lấy dữ liệu userArr từ LocalStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
