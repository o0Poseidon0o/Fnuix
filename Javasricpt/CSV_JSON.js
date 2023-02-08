// Load the fs (filesystem) module
const fs = require("fs");

// Read the CSV file
fs.readFile("data.csv", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the data by line breaks
  const lines = data.split("\n");

  // Extract the header line
  const header = lines.shift().split(",");

  // Initialize an array to store the JSON objects
  const jsonData = [];

  // Loop through the remaining lines
  for (let line of lines) {
    // Split the line by commas
    const values = line.split(",");

    // Initialize an object to store the data for this line
    const obj = {};

    // Loop through the values and map them to the header keys
    for (let i = 0; i < header.length; i++) {
      obj[header[i]] = values[i];
    }

    // Push the object to the JSON data array
    jsonData.push(obj);
  }

  // Write the JSON data to a file
  fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("File conversion complete!");
  });
});
