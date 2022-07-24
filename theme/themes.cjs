// INTENDED TO BE USED (IMPORTED AND USED) FOR TAILWIND CONFIGURATION
// NOT A SPECIAL CONVENTION, JUST MY WAY OF DOING THINGS

const { readFileSync } = require("fs");

const typescriptThemeFileContent = readFileSync("./theme/daisy-themes.ts");

const typescriptString = Buffer.from(typescriptThemeFileContent).toString(
  "utf-8"
);

const jsonString = /\[.+\]/.exec(typescriptString);

const themesArr = jsonString ? JSON.parse(jsonString) : [];
// console.log({ themesArr });
module.exports = themesArr;
