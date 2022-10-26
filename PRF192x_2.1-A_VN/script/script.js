// lab1
let country = "country";
let continent = "continent";
let population = 99188752;
console.log(country);
console.log(continent);
console.log(population);
//lab2
const isIsland = false;
let language = "Vietnamese";
console.log(isIsland);
console.log(language);
//lab2.3
let populationChia2 = population / 2;
console.log(populationChia2);
populationChia2 += 1;
console.log(populationChia2);
if (populationChia2 >= 6000000) {
  console.log("Dan so lớn hơn 6 triệu dân");
} else {
  console.log("Dan so nho hon 6 triệu dâns ");
}
if (populationChia2 >= 33000000) {
  console.log("Dan so lớn hơn mức trung binnh 33 trieu dân");
} else {
  console.log("Dan so nho hon mức trung bình 33 triệu dân ");
}

let description =
  country + " and its " + population + " million people speak " + language;
console.log(description);

let descriptionNew = `${country} and its ${population} million people speak ${language}`;
console.log(descriptionNew);
if (population >= 33000000) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33000000 - population} million below average`
  );
}
//switch
const day = "monday";
switch (day) {
  case "monday":
    console.log("ke hoach");
    console.log("nghi lam");
    break;
  case "Tuesday":
    console.log("Thứ ba");
    break;
  default:
    console.log("Not a valid day!");
}
//lab3
var a = "9" - "5";
console.log(a);
var a = Boolean("123" < 57);
console.log(a);

// const numNeighours = Number(
//   prompt("How many neighbor countries does your country have?")
// );
// // if (numNeighours == 1) {
// //   console.log("Only 1 border!");
// // } else if (numNeighours > 1) {
// //   console.log("More than 1 border");
// // } else {
// //   console.log("No borders");
// // }
// if (numNeighours === 1) {
//   console.log("Only 1 border!");
// } else if (numNeighours > 1) {
//   console.log("More than 1 border");
// } else if (numNeighours === 0) {
//   console.log("No borders");
// }

const ngonNgu = prompt("Ngôn ngữ là gì");
const danSo = prompt("Dân số bao nhiêu");
const daoQuoc = Boolean(prompt("Có phải đảo Quốc không???"));

if (ngonNgu == "English" && danSo == 50 && daoQuoc === true) {
  console.log("You should live in Portugal:)");
} else {
  console.log("Portugal does not meet your criteria :(");
}

switch (ngonNgu) {
  case "Chinese or Mandarin":
    console.log("MOST number of native speakers!");
    break;
  case "Spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "English":
    console.log("3rd place");
    break;
  case "Hindi":
    console.log("Number 4");
    break;
  case "Arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}
// Toán tử 3 ngôi
danSo > 33
  ? console.log("Portugal's population is above average.")
  : console.log("Portugal's population is below average.");
// bat che do strict de tranh loi
("use strict");
function logger() {
  console.log("My name is Nhan");
}
logger();
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oragnes.`;
  return juice;
}
fruitProcessor(5, 0);
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
const apple0Juice = fruitProcessor(8, 2);
console.log(apple0Juice);

const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);
