const sc_to_slug = require("../_data/sc_to_slug.json");

function scLevel(sc, targetWcagVersion, language) {
  let level;

  if (sc_to_slug[targetWcagVersion] && 
      sc_to_slug[targetWcagVersion][language] && 
      sc_to_slug[targetWcagVersion][language][sc]) {
    level = sc_to_slug[targetWcagVersion][language][sc]["level"] || "";
    return `${level}`;
  } else {
    console.error(`‼️ Cannot generate level for ${sc}, as it cannot be found in the data. Add it to "./_data/sc_to_slug.json"`);
    return ``;
  }
 }

 module.exports = scLevel;