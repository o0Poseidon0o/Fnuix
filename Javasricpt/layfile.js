const fs = require("fs").promises;

async function main() {
  try {
    const txtContent = await fs.readFile("data.txt", "utf-8");
    if (!txtContent) {
      console.error("File is empty or does not exist.");
      return;
    }

    const lines = txtContent.split("\n");
    const jsonArray = [];

    for (let i = 0; i < lines.length; i += 2) {
      jsonArray.push({
        cau: lines[i].split(": ")[1].replace("cau ", ""),
        dapAn: lines[i + 1].split(": ")[1],
      });
    }

    const jsonContent = JSON.stringify(jsonArray);
    await fs.writeFile("file.json", jsonContent, "utf-8");
    console.log("File is written successfully.");
  } catch (err) {
    console.error(err);
  }
}

main();
