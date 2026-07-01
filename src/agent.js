/// Main agent entry point

const config = require("../config/config.json");
const checkRewardRule = require("./rules");
const sendReward = require("./rewards");
const logAction = require("./logger");

logAction("Listening for event: " + config.eventName);

const event = "task_completed";

if (event === config.eventName && checkRewardRule()) {
sendReward(config.rewardAmount);
logAction("Reward amount: " + config.rewardAmount);
logAction("Reward of " + config.rewardAmount + " completed");
}
