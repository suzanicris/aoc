const fs = require("node:fs");
require("dotenv").config();

const part1 = (lines) => {
  const [timesRaw, distancesRaw] = lines;

  const extractValues = (values) =>
    values.split(":")[1].split(" ").filter(Boolean).map(Number);

  const times = extractValues(timesRaw);
  const distances = extractValues(distancesRaw);

  const win = [];

  times.forEach((totalTime, index) => {
    let beat = 0;

    for (let pressingTime = 0; pressingTime < totalTime; pressingTime++) {
      const racingTime = totalTime - pressingTime;
      const speed = 1 * pressingTime;

      const distance = racingTime * speed;

      if (distance > distances[index]) {
        beat += 1;
      }
    }

    win.push(beat);
  });

  const total = win.reduce((acc, value) => acc * value, 1);
  console.log(total);
};

const part2 = (lines) => {
  const [timesRaw, distancesRaw] = lines;

  const extractValues = (values) =>
    Number(values.split(":")[1].split(" ").filter(Boolean).join(""));

  const totalTime = extractValues(timesRaw);
  const totalDistance = extractValues(distancesRaw);

  let beat = 0;

  for (let pressingTime = 0; pressingTime < totalTime; pressingTime++) {
    const racingTime = totalTime - pressingTime;
    const speed = 1 * pressingTime;

    const distance = racingTime * speed;

    if (distance > totalDistance) {
      beat += 1;
    }
  }

  console.log(beat);
};

fs.readFile(process.env.FILE_06, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  part2(lines);
});
