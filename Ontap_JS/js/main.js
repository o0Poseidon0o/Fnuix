"use strict";
const submit = document.querySelector(".btn-doom");
const submitapi = document.querySelector(".btn-api");
const doom = document.querySelector(".doom");
const api = document.querySelector(".api");
const tabp = document.getElementsByTagName("p"); //Gọi một phần tử thẻ p
const subClose = document.querySelector(".btn-closeDoom");

// ----------------------------modal DOOM-------------------------------
submit.addEventListener("click", function () {
  doom.classList.remove("hidden"); //Thêm Class vào 1 Class
});
subClose.addEventListener("click", function () {
  doom.classList.add("hidden");
});
// --------------------------Đổi các thẻ p sang màu đen-------------------
tabp[0].style.color = "black";
console.log(tabp);
// --------------modal API--------------------------
submitapi.addEventListener("click", function () {
  api.classList.remove("hidden");
});
subClose.addEventListener("click", function () {
  api.classList.add("hidden");
});
tabp[1].style.color = "black";
console.log(tabp);
// -------------fetch-------------------
// Trả ra 1 promise
fetch(
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly`
)
  .then((data) => {
    return data.json(); //Chuyển đổi sang Json
  })
  .then((data) => {
    console.log(data);
  });

//------------------async await--------------------
const getNewTodo = async () => {
  // Phương pháp này dùng để bắt lỗi dòng lệnh
  //Try là thực hiện dòng lệnh trong khối nếu bị lỗi sẽ đưa ra catch
  try {
    let data = await fetch(); //hàm fetch trả về 1 promise
    let data1 = await data.json();
    console.log(data1);
    return data;
  } catch {
    console.log();
  }
  throw new Error(data.status); // throw dùng để chuyển ra 1 lỗi
}; //Khi kết nối với data thì nên sử dụng vì khi hành động lấy
//data nó sẽ trả về 1 promise sẽ làm tốn thời gian lấy đa ta về
//await là chờ tao lấy dữ liệu.
