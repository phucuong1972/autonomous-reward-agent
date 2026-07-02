const fs = require("fs");
const path = require("path");

function loadPolicy(name) {
  const filePath = path.join(
    __dirname,
    "../config/cognition",
    `${name}.json`
  );

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

module.exports = {
  loadPolicy
};