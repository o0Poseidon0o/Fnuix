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
