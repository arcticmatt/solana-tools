const fs = require("fs");

//
// HELPERS
//

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getColorMap() {
  const data = fs.readFileSync("css/global/colors/ColorVariables.css", "utf8");
  const lines = data.split("\n").filter((line) => line.includes("--color"));
  return Object.assign(
    {},
    ...lines.map((line) => {
      const parts = line.trim().split(":");
      const colorName = parts[0].slice(8);
      const colorValueRaw = parts[1].trim();
      const colorValue = colorValueRaw.slice(0, colorValueRaw.indexOf(";"));
      return { [colorName]: colorValue };
    })
  );
}

//
// CSS codegen
//

function outputColorClasses(colorMap) {
  const logger = fs.createWriteStream("css/global/colors/ColorClasses.css", {
    flags: "w",
  });

  Object.keys(colorMap).forEach((colorName) => {
    logger.write(`.color${capitalizeFirstLetter(colorName)} {\n`);
    logger.write(`  color: var(--color-${colorName});\n`);
    logger.write("}\n\n");
  });
}

function outputBackgroundColorClasses(colorMap) {
  const logger = fs.createWriteStream(
    "css/global/colors/BackgroundColorClasses.css",
    {
      flags: "w",
    }
  );

  Object.keys(colorMap).forEach((colorName) => {
    logger.write(`.backgroundColor${capitalizeFirstLetter(colorName)} {\n`);
    logger.write(`  background-color: var(--color-${colorName});\n`);
    logger.write("}\n\n");
  });
}

//
// Enum codegen
//

function outputColorClassEnum(colorMap) {
  const logger = fs.createWriteStream("src/types/enums/ColorClass.ts", {
    flags: "w",
  });

  logger.write("enum ColorClass {\n");

  Object.keys(colorMap).forEach((colorName) => {
    logger.write(
      `  ${capitalizeFirstLetter(colorName)} = "color${capitalizeFirstLetter(
        colorName
      )}",\n`
    );
  });

  logger.write("}\n\n");
  logger.write("export default ColorClass;\n");
}

function outputBackgroundColorClassEnum(colorMap) {
  const logger = fs.createWriteStream(
    "src/types/enums/BackgroundColorClass.ts",
    {
      flags: "w",
    }
  );

  logger.write("enum BackgroundColorClass {\n");

  Object.keys(colorMap).forEach((colorName) => {
    logger.write(
      `  ${capitalizeFirstLetter(
        colorName
      )} = "backgroundColor${capitalizeFirstLetter(colorName)}",\n`
    );
  });

  logger.write("}\n\n");
  logger.write("export default BackgroundColorClass;\n");
}

function outputColorValueEnum(colorMap) {
  const logger = fs.createWriteStream("src/types/enums/ColorValue.ts", {
    flags: "w",
  });

  logger.write("enum ColorValue {\n");

  Object.keys(colorMap).forEach((colorName) => {
    logger.write(
      `  ${capitalizeFirstLetter(colorName)} = "${colorMap[colorName]}",\n`
    );
  });

  logger.write("}\n\n");
  logger.write("export default ColorValue;\n");
}

try {
  const colorMap = getColorMap();

  outputColorClasses(colorMap);
  outputBackgroundColorClasses(colorMap);
  outputColorClassEnum(colorMap);
  outputBackgroundColorClassEnum(colorMap);
  outputColorValueEnum(colorMap);
} catch (err) {
  console.error(err);
}
