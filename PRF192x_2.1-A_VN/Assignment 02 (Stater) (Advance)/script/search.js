"use strict";

const findBtn = document.getElementById("find-btn");

renderBreed(0);

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
  `;
    tableBodyEl.appendChild(row);
  }
}

// Sự kiện button Find
findBtn.addEventListener("click", function () {
  const find = petArr.filter((petArr) => {
    return (
      petArr.id.includes(idInput.value) &&
      petArr.name.includes(nameInput.value) &&
      (!vaccinatedInput.checked ||
        petArr.vaccinated === vaccinatedInput.checked) &&
      (!dewormedInput.checked || petArr.dewormed === dewormedInput.checked) &&
      (!sterilizedInput.checked ||
        petArr.sterilized === sterilizedInput.checked) &&
      (typeInput.value === "Select Type" || petArr.type === typeInput.value) &&
      (breedInput.value === "Select Breed" || petArr.breed === breedInput.value)
    );
  });
  renderTableData(find);
});
