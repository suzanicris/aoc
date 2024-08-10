const fs = require("node:fs");
require("dotenv").config();

const getWinningAndCardsByLine = (line) => {
  return line
    .split(":")[1]
    .split("|")
    .map((numbers) => numbers.trim().split(" ").filter(Boolean).map(Number));
};

const getMathByGame = (winning, cards) => {
  let winningNumbers = 0;

  cards.forEach((card) => {
    if (winning.includes(card)) {
      winningNumbers += 1;
    }
  });

  if (!winningNumbers) return 0;
  return winningNumbers;
};

const part1 = (lines) => {
  const values = lines.map((line) => {
    const [winning, cards] = getWinningAndCardsByLine(line);
    const winningNumbers = getMathByGame(winning, cards);
    return Math.pow(2, winningNumbers - 1);
  });

  return values.reduce((acc, value) => value + acc, 0);
};

const part2 = (lines) => {
  const cardsInstance = [];
  const matchesByCards = [];

  lines.forEach((line, index) => {
    const [winning, cards] = getWinningAndCardsByLine(line);

    const winningNumbers = getMathByGame(winning, cards);
    const currentCard = index;

    matchesByCards[currentCard] = winningNumbers;
  });

  for (let card = 1; card <= lines.length; card++) {
    const matches = matchesByCards[card - 1];
    cardsInstance[card] ??= 1;
    const instances = cardsInstance[card];

    for (let instance = 0; instance < instances; instance++) {
      for (let match = 1; match <= matches; match++) {
        const nextCard = card + match;

        cardsInstance[nextCard] ??= 1;
        cardsInstance[nextCard] += 1;
      }
    }
  }

  const total = cardsInstance.reduce((acc, value) => acc + value, 0);
  console.log(total);
};

fs.readFile(process.env.FILE_04, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const value = part2(lines);
  // console.log(value);
});
