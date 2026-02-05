const fs = require("fs");
const path = require("path");

const weekliesFolder = path.resolve(__dirname, "../events/weeklies");

const movies = fs
  .readdirSync(weekliesFolder)
  .filter((name) => path.extname(name) === ".json")
  .map((name) => ({
    key: path.parse(name).name,
    ...require(path.join(weekliesFolder, name)),
  }));

module.exports = movies;
