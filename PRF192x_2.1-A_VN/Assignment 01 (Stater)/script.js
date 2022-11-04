"use strict";

// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// Khai báo biến để lấy các Element.
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
// Người dùng bấm vào submit để nhập thông tin thú cưng.
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    Type: typeInput.value,
    weight: weightInput.value,
    Length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vacci: vaccinatedInput.checked,
    dewo: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  if (data.id === "") {
    alert("ID must unique!");
  } else if(data.age < 1 || data.age > 15){
    alert("Age must be between 1 and 15!");
  }else if(data.weight<1 || data.weight>15){
    alert('Weight must be between 1 and 15!')
  }else if(data.Length<1 || data.Length>100){
    alert('Length must be between 1 and 100!')
  }else if(data.Type==="Select Type"){
    alert('Please select Type!')
  }else if(data.breed==="Select Breed"){
    alert('Please select Breed!')
  }
 
  console.log(data);
  console.log(typeof( data.Type))
  console.log(data.Length);
});
// Them thu cung vao danh sach
const petArr=[];

const validate = validateData(data)
if(validate){
  petArr.push(data);
  clearInput();
  renderTableData(petArr);
}