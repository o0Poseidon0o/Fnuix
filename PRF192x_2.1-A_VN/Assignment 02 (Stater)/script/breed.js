"use strict";
const breedArr = [];
const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

// Kiểm tra dữ liệu nhập
function validateData(data) {
  if (data.name === "") {
    alert("Phải nhập tên Breed!!!!");
  } else if (data.tpye === "Select Type") {
    alert("Phải nhập loại!!!!");
  } else {
    return true;
  }
}

// Nhập thông tin breed
submitBtn.addEventListener("click", function () {
  const data = {
    name: breedInput.value,
    tpye: typeInput.value,
  };
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    renderTableBreed(data);
    clearInput();
  }
  saveToStorage("breedArr", breedArr);
  getFromStorage("breedArr");
  console.log(breedArr);
  console.log(data);
});

// Ham xoa du lieu dua ve ban dau
const clearInput = () => {
  breedInput.value = "";
  typeInput.value = "Select Type";
};

// Hien thi danh sách loại
function renderTableBreed(a) {
  tableBodyEl.innerHTML = "";
  breedArr.forEach(function (breed, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope = "col">${index + 1}</td>
    <td scope = "col">${breed.name}</td>
    <td scope = "col">${breed.tpye}</td>
    <td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      breed.name
    }')">Delete</button>
    </td>
    `;
    tableBodyEl.appendChild(row);
  });
}
