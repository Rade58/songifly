// INTENDED TO BE USED (IMPORTED AND USED) FOR TAILWIND CONFIGURATION BUT ALSO IN
// THEME SWITCHER LOGIC

const { readFileSync } = require("fs");

const typescriptThemeFileContent = readFileSync("./daisy-themes.ts");

const typescriptString = Buffer.from(typescriptThemeFileContent).toString(
  "utf-8"
);

const jsonString = /\[.+\]/.exec(typescriptString);

const themesArr = jsonString ? JSON.parse(jsonString) : [];
console.log({ themesArr });
module.exports = themesArr;
