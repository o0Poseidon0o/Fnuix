"use strict";

//Chọn element
const deleteBtn = document.querySelector(".btn-danger");
const healthyPetBtn = document.getElementById("healthy-btn");

//Khai báo biến
let heathyCheck = false;
const dt = new Date();

//Kiểm tra dữ liệu input
function validateData(data) {
  if (!data.id) {
    alert("Please input for ID!");
    idInput.focus();
    return "";
  }
  if (!data.name) {
    alert("Please input name!");
    nameInput.focus();
    return "";
  }
  if (!data.age) {
    alert("Please input age!");
    ageInput.focus();
    return "";
  }
  if (data.type === "Select Type") {
    alert("Please select type!");
    typeInput.focus();
    return "";
  }
  if (!data.weight) {
    alert("Please input weight!");
    weightInput.focus();
    return "";
  }
  if (!data.length) {
    alert("Please input length!");
    lengthInput.focus();
    return "";
  }
  if (data.breed === "Select Breed") {
    alert("Please select breed!");
    breedInput.focus();
    return "";
  }
  if (checkID(data.id) > -1) {
    alert("ID must unique!");
    idInput.focus();
    return "";
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    ageInput.focus();
    return "";
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    weightInput.focus();
    return "";
  }
  if (data.length < 1 || data.weight > 100) {
    alert("Weight must be between 1 and 100!");
    lengthInput.focus();
    return "";
  }
  return true;
}

//Hiển thị danh sách pet
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const pet = petArr[i];
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
  <td>${pet.name}</td>
  <td>${pet.age}</td>
  <td>${pet.type}</td>
  <td>${pet.weight} kg</td>
  <td>${pet.length} cm</td>
  <td>${pet.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
  </td>
  <td><i class="bi ${
    pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td>${pet.date}</td>
  <td><button type="button" class="btn btn-danger" onclick="deletePet('${
    pet.id
  }')">Delete</button>
  </td>`;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

//Sự kiện button Submit
submitBtn.addEventListener("click", function () {
  //lấy dữ liệu
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: dt.toLocaleDateString("vi-VI"),
  };
  // Kiểm tra dữ liệu và lưu lại
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("pet", petArr);
    clearInput();
    renderTableData(petArr);
  }
});

//xóa Pet
function deletePet(petId) {
  if (confirm("Are you sure?")) {
    petArr.splice(checkID(petId), 1);
    saveToStorage("pet", petArr);
    renderTableData(petArr);
  }
}

//Hiển thị pet mạnh khỏe hoặc không
healthyPetBtn.addEventListener("click", function () {
  const healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
  heathyCheck = heathyCheck ? false : true;
  if (heathyCheck) {
    renderTableData(healthyPetArr);
    healthyPetBtn.textContent = "Show All Pet";
  } else {
    renderTableData(petArr);
    healthyPetBtn.textContent = "Show Healthy Pet";
  }
});
