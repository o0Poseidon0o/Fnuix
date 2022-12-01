"use strict";
//Chọn element
const containerForm = document.getElementById("container-form");

//khai báo biến
const dt = new Date();
let index = -1;

//Kiểm tra dữ liệu input
function validateData(data) {
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
    <td><button type="button" class="btn btn-warning" onclick="editPet('${
      pet.id
    }')">Edit</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

// Nhập dữ liệu pet đã chọn vào form
function editPet(petId) {
  // hiện form nhập liệu
  containerForm.classList.remove("hide");

  // lấy vị trí pet trong mảng
  index = petArr.findIndex((e) => e.id === petId);

  //Nhập dữ liệu vào form
  const pet = petArr[index];
  idInput.value = petId;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  renderBreed(pet.type);
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
}

//Sự kiện button submit
submitBtn.addEventListener("click", function () {
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
  // Lưu lại thông tin mới
  const validate = validateData(data);
  if (validate) {
    petArr[index] = data;
    saveToStorage("pet", petArr);
    renderTableData(petArr);
    clearInput();
    containerForm.classList.add("hide");
  }
});
