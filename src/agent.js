/// Main agent entry point

const config = require("../config/config.json");
const checkRewardRule = require("./rules");
const sendReward = require("./rewards");
const logAction = require("./logger");

logAction("Listening for event: " + config.eventName);

if (checkRewardRule()) {
sendReward(config.rewardAmount);
logAction("Reward amount: " + config.rewardAmount);
logAction("Reward of " + config.rewardAmount + " completed");
}
