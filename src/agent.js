// Main agent entry point

const checkRewardRule = require("./rules");
const sendReward = require("./rewards");
const logAction = require("./logger");

logAction("Agent started");

if (checkRewardRule()) {
sendReward();
logAction("Reward process completed");
}
