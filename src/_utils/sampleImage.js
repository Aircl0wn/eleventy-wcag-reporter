const fs = require("fs"); 

function sampleImage(imageFile, report) {
  const expectedFile = `./src/reports/${report}/images/${imageFile}`;
  
  if (fs.existsSync(expectedFile)) {
    return `images/${imageFile}`;
  } else {
    return "../example/images/default-screenshot.png";
  }
}

module.exports = sampleImage;
