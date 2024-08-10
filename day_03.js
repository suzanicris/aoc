const fs = require("node:fs");
require("dotenv").config();

const getAdjacent = ({ line, column }) => {
  const top = line != 0 ? line - 1 : null;
  const bottom = line + 1;

  const left = column != 0 ? column - 1 : null;
  const right = column + 1;

  return {
    [top]: [left, column, right],
    [line]: [left, null, right],
    [bottom]: [left, column, right],
  };
};

const getNumbersByPosition = (adjacentArray, numbersPositions) => {
  const numbers = [];
  const numbersPositionsCopy = [...numbersPositions];

  Object.entries(adjacentArray).forEach(([line, positions]) => {
    positions.forEach((position) => {
      const item = numbersPositionsCopy[line]?.[position];
      if (item && !item.visited) {
        numbers.push(item.value);
        item.sameAs.forEach(
          (i) => (numbersPositionsCopy[line][i].visited = true)
        );
      }
    });
  });

  return numbers.flat();
};

const part1 = (lines) => {
  const numbersPositions = [];
  const specialPositions = [];

  lines.forEach((line, i) => {
    const items = line.split("");
    let positions = [];
    let number = "";

    items.forEach((item, j) => {
      if (!isNaN(item)) {
        number += item;
        positions.push(j);

        if (j !== items.length - 1) return;
      }

      if (number) {
        const value = Number(number);
        positions.forEach((position) => {
          numbersPositions[i] ??= [];
          numbersPositions[i][position] = { value, sameAs: positions };
        });

        number = "";
        positions = [];
      }

      specialPositions.push({ line: i, column: j });
    });
  });

  return specialPositions.reduce((acc, value) => {
    const values = getNumbersByPosition(getAdjacent(value), numbersPositions);

    const sumValues = values.reduce((acc2, v) => acc2 + v, 0);

    return acc + sumValues;
  }, 0);
};

const part2 = (lines) => {
  const numbersPositions = [];
  const specialPositions = [];

  lines.forEach((line, i) => {
    const items = line.split("");
    let positions = [];
    let number = "";

    items.forEach((item, j) => {
      if (!isNaN(item)) {
        number += item;
        positions.push(j);

        if (j !== items.length - 1) return;
      }

      if (number) {
        const value = Number(number);
        positions.forEach((position) => {
          numbersPositions[i] ??= [];
          numbersPositions[i][position] = { value, sameAs: positions };
        });

        number = "";
        positions = [];
      }

      if (item === "*") {
        specialPositions.push({ line: i, column: j });
      }
    });
  });

  return specialPositions.reduce((acc, value) => {
    const values = getNumbersByPosition(getAdjacent(value), numbersPositions);

    if (values.length < 2) return acc;

    const multipliedValues = values.reduce((acc2, v) => acc2 * v, 1);

    return acc + multipliedValues;
  }, 0);
};

fs.readFile(process.env.FILE_03, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  console.log(part2(lines));
});

// part2 = 87263515
