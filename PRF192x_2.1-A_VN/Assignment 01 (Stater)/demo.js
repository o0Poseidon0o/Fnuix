"use strict";
//khai bao cac bien can dung
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
const HealthyBtn = document.getElementById("healthy-btn");
const Bmibtn = document.getElementById("bmi-btn");
const theadEl = document.getElementById("tthead");

const petArr = [];
const petArrhealthy = [];
const petArrBMI = [];
let healthyCheck = true;

//Ham kiem tra dieu kien
function validateData(data) {
  //kiem tra du lieu da duoc nhap chua
  if (data.id == "") {
    alert("Ban chua nhap id");
    return;
  } else if (data.name == "") {
    alert("Ban chua nhap name");
    return;
  } else if (data.type == "Select Type") {
    alert("Hay chon type cho pet");
    return;
  } else if (data.breed == "Select Breed") {
    alert("Hay chon breed cho pet");
    return;
  } else if (isNaN(data.age)) {
    alert("chon so tuoi cho pet");
    return;
  } else if (isNaN(data.weight)) {
    alert("Chon so ki cho pet");
    return;
  } else if (isNaN(data.length)) {
    alert("Chon chieu dai cho pet");
    return;
  }
  // kiem tra cac dieu kien yeu cau
  for (let i = 0; i < petArr.length; i++)
    if (data.id === petArr[i]["id"]) {
      alert("ID must unique!");
      return;
    }

  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
  } else if (data.type === false) {
    alert("Please select Type!");
    return false;
  } else if (data.breed === false) {
    alert("Please select Breed!");
    return false;
  } else return true;
}
//Ham them vao table
function renderTableData(a) {
  //tao lai thead co BMI
  theadEl.innerHTML = "";
  const rowthead = document.createElement("tr");
  rowthead.innerHTML = `
              <th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Age</th>
							<th scope="col">Type</th>
							<th scope="col">Weight</th>
							<th scope="col">Length</th>
							<th scope="col">Breed</th>
							<th scope="col">Color</th>
							<th scope="col">Vaccinated</th>
							<th scope="col">Dewormed</th>
							<th scope="col">Sterilized</th>
                     <th scope="col">BMI</th>
							<th scope="col">Date Added</th>
							<th scope="col">Action</th>
   `;
  theadEl.appendChild(rowthead);
  // tao tbody cho tung phan tu trong mang can xuat
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < a.length; i++) {
    var ngay = a[i]["date"].getDate();
    var thang = a[i]["date"].getMonth() + 1;
    var nam = a[i]["date"].getFullYear();
    const row = document.createElement("tr");
    row.innerHTML = `
   <th scope="col">${a[i]["id"]}</th>
   <td scope="col">${a[i]["name"]}</td>
   <td scope="col">${a[i]["age"]}</td>
   <td scope="col">${a[i]["type"]}</td>
   <td scope="col">${a[i]["weight"]}</td>
   <td scope="col">${a[i]["length"]}</td>
   <td scope="col">${a[i]["breed"]}</td>
   <td scope="col"><i class="bi bi-square-fill" style="color: ${a[i]["color"]}"></i></td>
   <td scope="col">${a[i]["vaccinated"]}</td>
   <td scope="col">${a[i]["dewormed"]}</td>
   <td scope="col">${a[i]["sterilized"]}</td>
   <td scope="col">${a[i]["BMI"]}</td>
   <td scope="col">${ngay}/${thang}/${nam}</td>
   <td><button type="button" class="btn btn-danger" onclick="deletePet('${a[i]["id"]}')">Delete</button>
							</td>`;
    tableBodyEl.appendChild(row);
  }
}
//Ham xoa du lieu nhap tren Form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.selectedIndex = 0;
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.selectedIndex = 0;
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  colorInput.value = "#000000";
}
//xu ly nut submit khi click
submitBtn.addEventListener("click", function () {
  //nhan gia tri nguoi dung nhap
  const data = {
    id: document.getElementById("input-id").value,
    name: nameInput.value,
    //parseInt dung de bien string thanh number
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    BMI: "?",
    date: new Date(),
  };
  //   console.log(data);
  //kiem tra xem nguoi dung da nhap dung hay chua
  const validata = validateData(data);
  //   const validata = validateData(data);
  //   console.log(validata);
  // Neu dung day vao mang petArr va clear lai form va hien thi cho nguoi dung xem peArr
  if (validata) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }

  // console.log(petArr);
});
//Xoa pet trong
const deletePet = function (petid) {
  if (confirm("Are you sure?")) {
    //tim phan tu nguoi dung can xoa
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i]["id"] === petid) {
        //xoa gia tri can tim ra khoi mang
        petArr.splice(i, 1);
      }
    }
  }
  renderTableData(petArr);
  //  console.log(petArr);
};
//Xu ly nut Healthy khi click
HealthyBtn.addEventListener("click", function () {
  //kiem tra healthycheck xem dang true hay fales
  if (healthyCheck) {
    //Tao lai mang petArrhealthy moi lan click
    //Code don  gian va hieu qua hon vi neu khong tao moi se xuat hien phan tu bi trung trong petArrHealthy
    const petArrhealthy = [];
    for (let i = 0; i < petArr.length; i++)
      if (
        petArr[i]["vaccinated"] &&
        petArr[i]["dewormed"] &&
        petArr[i]["sterilized"]
      ) {
        petArrhealthy.push(petArr[i]);
      }
    HealthyBtn.textContent = "Show All Pet";
    renderTableData(petArrhealthy);
    // lam xong se tra ve fasle de khi click vao de dap ung yeu cau de bai
    healthyCheck = false;
  } else {
    //Xu ly healthycheck khi false
    HealthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
    healthyCheck = true;
  }
});
//Xu ly nut Calculate BMI
Bmibtn.addEventListener("click", function () {
  //van tao moi petArrBMI de tranh bi trung khi lap di lap lai nhieu lan
  const petArrBMI = [];
  //kiem tra type Dog or Cat de tinh BMI cho tung phan tu trong petArr
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i]["type"] == "Dog") {
      petArr[i]["BMI"] = (
        (petArr[i]["weight"] * 703) /
        petArr[i]["length"] ** 2
      ).toFixed(2);
    } else if (petArr[i]["type"] == "Cat") {
      petArr[i]["BMI"] = (
        (petArr[i]["weight"] * 886) /
        petArr[i]["length"] ** 2
      ).toFixed(2);
    }
    //them phan petArr hien tai vao petArrBMI
    petArrBMI.push(petArr[i]);
  }
  //Hien thi mang petArrBMI khi da them het cac phan tu da tinh BMI
  renderTableData(petArrBMI);
});
