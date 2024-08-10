const fs = require("node:fs");
require("dotenv").config();

const readFileByDay = (day) => {
  const path = process.env.PATH;

  return fs.readFile(`${path}/key_day_${day}.txt`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    return data.split("\n");
  });
};

module.exports = { readFileByDay };
