const fs = require("node:fs");
const { readFileByDay } = require("./utils");
require("dotenv").config();

const part1 = (lines) => {
  const MAX = {
    ["blue"]: 14,
    ["red"]: 12,
    ["green"]: 13,
  };

  const ids = [];

  lines.forEach((line) => {
    const [game, setsRaw] = line.split(": ");
    const id = game.split(" ")[1];
    const sets = setsRaw.split("; ");
    let isPossible = true;

    sets.forEach((set) => {
      const subsets = set.split(", ");
      let isSubsetPossible = true;

      subsets.forEach((subset) => {
        const number = Number(subset.match(/\d/g).join(""));

        if (subset.includes("blue") && number <= MAX["blue"]) {
          return;
        }

        if (subset.includes("green") && number <= MAX["green"]) {
          return;
        }

        if (subset.includes("red") && number <= MAX["red"]) {
          return;
        }

        isSubsetPossible = false;
      });

      if (!isSubsetPossible) {
        isPossible = false;
      }
    });

    if (isPossible) {
      ids.push(Number(id));
    }
  });

  return ids.reduce((acc, value) => acc + value, 0);
};

const part2 = (lines) => {
  const cubesMultiplied = [];

  lines.forEach((line) => {
    const MAX = {
      blue: 0,
      red: 0,
      green: 0,
    };

    const setsRaw = line.split(": ")[1];
    const sets = setsRaw.split("; ");

    sets.forEach((set) => {
      const subsets = set.split(", ");

      subsets.forEach((subset) => {
        const number = Number(subset.match(/\d/g).join(""));

        if (subset.includes("blue") && number > MAX.blue) {
          MAX.blue = number;
          return;
        }

        if (subset.includes("green") && number > MAX.green) {
          MAX.green = number;
          return;
        }

        if (subset.includes("red") && number > MAX.red) {
          MAX.red = number;
          return;
        }
      });
    });

    const cubeMultiplied = Object.values(MAX).reduce(
      (acc, value) => acc * value,
      1
    );
    cubesMultiplied.push(cubeMultiplied);
  });

  return cubesMultiplied.reduce((acc, value) => acc + value, 0);
};

fs.readFile(process.env.FILE_02, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const sum = part2(lines);
  console.log(sum);
});
