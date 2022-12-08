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
// fetch(
//   `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly`
// )
//   .then((data) => {
//     return data.json(); //Chuyển đổi sang Json
//   })
//   .then((data) => {
//     console.log(data);
//   });

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

const Arr1 = new Array(7, 8, 9, 10, 11, 12);
const Arr = [2, 3, 4, 5];

// ------------------filter loc du lieu---------------------------//
// Sẽ lọc hết tất cả phần tử trong mảng
const sochan = Arr.filter((a) => {
  return a % 2 === 0;
});
console.log(sochan);
// ------------------------find----------------------------//
// Chỉ trả về kết quả đugns đầu tiên
const sochan1 = Arr.find((a) => {
  return a % 2 === 0;
});
console.log(sochan1);
// --------------------map--------------------------------//
//Thay đổi Array hiện tại và tạo ra 1 Array mới
const sole = Arr1.map((a) => {
  return a % 2 !== 0;
});
console.log(sole);
console.log(Arr1);
// -------------ForEach----------------------//
// trả về giá trị true false
const sole1 = Arr1.forEach((a) => {
  return a % 2 !== 0;
});
console.log(sole1);
//--------------------some-------------------//
// Kiểm tra xem mảng có phần tử nào thỏa điều kiện không
// every Kiểm tra tất cả giá trị có giá trị đúng không
const sole2 = Arr1.some((a) => {
  return a % 2 !== 0;
});
console.log(sole2);
// // -------------reduce-----------------//
// // Biến Arry thành Object
// const sochan2 = Arr1.reduce((acc, cur) => {
//   //accumulate=>tích lũy qua từng vòng lặp=>acc={}
//   //cur=>phần tử đã loop qua
//   return { acc, [cur.email]: cur };
// }, {});
// // Biến  Object thành Arr
// const sochan3 = Arr1.values(Arr1).reduce(
//   acc,
//   (cur) => {
//     // acc=[]
//     return [acc, cur.email];
//   },
//   []
// );
const total = Arr1.reduce((acc, cur) => {
  return acc + cur; //0+7=7=>acc=7+8 V.v....
}, 0);
console.log(total);
