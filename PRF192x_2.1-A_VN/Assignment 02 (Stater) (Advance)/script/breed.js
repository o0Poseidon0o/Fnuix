"use strict";

//Chọn element
const deleteBtn = document.querySelector(".btn-danger");

//Hiển thị danh sách breed
function renderBreedTable(breed) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breed.length; i++) {
    const br = breed[i];
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${i + 1}</th>
    <td>${br.breed}</td>
    <td>${br.type}</td>
    <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
      br.breed
    }')">Delete</button>
      </td>`;
    tableBodyEl.appendChild(row);
  }
}
renderBreedTable(breedArr);

// Kiểm tra breed đã có chưa
function checkBreed(breed, type) {
  if (breedArr.length > 0)
    return breedArr.findIndex((x) => x.breed === breed && x.type === type);
  return -1;
}

// Kiểm tra dữ liệu input
function validateData(data) {
  if (!data.breed) {
    alert("Please input breed!");
    breedInput.focus();
    return "";
  }
  if (data.type === "Select Type") {
    alert("Please select type!");
    typeInput.focus();
    return "";
  }
  if (checkBreed(data.breed, data.type) > -1) {
    alert("Breed must unique!");
    breedInput.focus();
    return "";
  }
  return true;
}

//Xóa form sau khi lưu
const clearInputBreed = () => {
  typeInput.value = "Select Type";
  breedInput.value = "";
};

//Sự kiện button submit
submitBtn.addEventListener("click", function () {
  //Lấy dữ liệu từ form
  const data = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  // Kiểm tra và lưu vào danh sách
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    saveToStorage("breed", breedArr);
    clearInputBreed();
    renderBreedTable(breedArr);
  }
  console.log(data);
});

//Xóa breed
function deleteBreed(breed) {
  if (confirm("Are you sure?")) {
    breedArr.splice(checkBreed(breed), 1);
    renderBreedTable(breedArr);
    saveToStorage("breed", breedArr);
  }
}
