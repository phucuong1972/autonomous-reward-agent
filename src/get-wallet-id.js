const { execSync } = require("child_process");

function getDirectId() {
  return execSync("node src/wallet.mjs")
    .toString()
    .trim();
}

module.exports = getDirectId;