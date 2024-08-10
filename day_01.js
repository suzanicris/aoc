const fs = require("node:fs");
const { readFileByDay } = require("./utils");
require("dotenv").config();

const part1 = (lines) => {
  return lines.reduce((acc, line) => {
    const key = [];
    const numbers = line.match(/\d/g);

    key.push(numbers.shift());
    key.push(numbers.pop() ?? key[0]);

    console.log(key);

    return acc + Number(key.join(""));
  }, 0);
};

const part2 = (lines) => {
  const REGEX = /one|two|three|four|five|six|seven|eight|nine/g;

  const NUMBERS = {
    ["one"]: 1,
    ["two"]: 2,
    ["three"]: 3,
    ["four"]: 4,
    ["five"]: 5,
    ["six"]: 6,
    ["seven"]: 7,
    ["eight"]: 8,
    ["nine"]: 9,
  };

  return lines.reduce((acc, line) => {
    const key = [];
    const numbers = [];
    let currentWord = "";

    line.split("").forEach((character) => {
      if (character.match(/\d/g)) {
        numbers.push(Number(character));
        currentWord = "";
        return;
      }

      currentWord += character;
      const word = currentWord.match(REGEX);

      if (word) {
        numbers.push(NUMBERS[word]);
        currentWord = character;
      }
    });

    key.push(numbers.shift());
    key.push(numbers.pop() ?? key[0]);

    return acc + Number(key.join(""));
  }, 0);
};

const lines = readFileByDay("01");
const sum = part2(lines);

console.log(sum);
