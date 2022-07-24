const { readFileSync } = require("fs");

const typescriptThemeFileContent = readFileSync("./themes.ts");

const typescriptString = Buffer.from(typescriptThemeFileContent).toString(
  "utf-8"
);

const jsonString = /\[.+\]/.exec(typescriptString);

const themesArr = jsonString ? JSON.parse(jsonString) : [];

console.log({ themesArr });
