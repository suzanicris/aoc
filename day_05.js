const fs = require("node:fs");
const NodeCache = require("node-cache");
require("dotenv").config();

const myCache = new NodeCache();

const extractValues = (lines) => {
  const stringToArray = (value) => value.split(" ").map(Number);

  let beginIndex = 0;
  let info = [];
  let title = "";
  lines.forEach((line, index) => {
    if (index === 0) {
      info[0] = stringToArray(lines[0].split(":")[1].trim());
    }

    if (line === "") {
      beginIndex = index + 1;
      return;
    }

    if (index === beginIndex) {
      title = info.length;
      return;
    }

    if (index > beginIndex) {
      info[title] ??= [];
      info[title].push(stringToArray(line));
    }
  });

  return info;
};

const getPosition = (array, s) => {
  let position = s;

  for (let index = 0; index < array.length; index++) {
    const [destination, source, range] = array[index];
    if (s < source) continue;
    if (s > source + range) continue;

    const diff = s - source;
    position = destination + diff;
    break;
  }

  return position;
};

const getLocationFromSeed = (array, s) => {
  if (!array.length) {
    return s;
  }

  const position = getPosition(array.pop(), s);
  return getLocationFromSeed(array, position);
};

const part1 = (lines) => {
  const [seeds, ...rest] = extractValues(lines);
  const arr = rest.reverse();
  const positions = seeds.map((seed) =>
    getLocationFromSeed([...arr], seed, getPosition)
  );
  const lowest = positions.sort((a, b) => a - b)[0];
  return lowest;
};

const getSeeds = (seedsRaw) => {
  const seeds = [];

  for (let index = 0; index < seedsRaw.length - 1; index = index + 2) {
    const seed = seedsRaw[index];
    const range = seedsRaw[index + 1];
    seeds.push([seed, range]);
  }

  const s = [];
  for (let index = 1; index < seeds.length; index++) {
    const [seedCurrent, rangeCurrent] = seeds[index - 1];
    const seedCurrentLimit = seedCurrent + rangeCurrent;

    const [seedNext, rangeNext] = seeds[index];
    const seedNextLimit = seedNext + rangeNext;

    if (seedNext > seedCurrent && seedNextLimit < seedCurrentLimit) {
      s.push([seedCurrent, rangeCurrent]);
    }
  }

  return seeds;
};

const getPositionByRange = ([...array], [s, seedRange]) => {
  let lowest = null;
  for (let index = 0; index < seedRange; index++) {
    const seed = s + index;
    const position = getLocationFromSeed([...array], seed);
    if (!lowest) lowest = position;
    if (lowest > position) {
      lowest = position;
    }
  }
  return lowest;
};

const part2 = (lines) => {
  const [seedsRaw, ...rest] = extractValues(lines);

  const seeds = getSeeds(seedsRaw);

  // const arr = rest.reverse();
  // const positions = seeds.map((seedRange) =>
  //   getPositionByRange([...arr], seedRange)
  // );
  // const lowest = positions.sort((a, b) => a - b)[0];
  // console.log(lowest);
};

fs.readFile(process.env.FILE_05, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  part2(lines);
});

// 0 -> 350004378
// 1 -> 440300553
// 2 -> 201731623
// 3 -> 503320162
// 4 -> 47238415
// 5 -> 195554894
// 6 -> 24261546
// 7 -> 333834852
// 8 -> 2942405136
// 9 -> 347042062

// [
//   350004378, 440300553, 201731623, 503320162, 47238415, 195554894, 24261546,
//   333834852, 2942405136, 347042062,
// ].sort((a,b) => a-b);
