/// Main agent entry point

const config = require("../config/config.json");
const checkRewardRule = require("./rules");
const sendReward = require("./rewards");
const logAction = require("./logger");

logAction("Listening for event: " + config.eventName);
logAction("Network: " + config.network);
logAction("Reward recipient: " + config.userId);

const event = config.eventName;

logAction("Received event: " + event);

if (event === config.eventName && checkRewardRule()) {
sendReward(config.rewardAmount);
logAction(
"Reward amount: " +
config.rewardAmount +
" sent to " +
config.userId
);
logAction(
"Reward of " +
config.rewardAmount +
" completed for event " +
event
);
logAction("Remaining budget: " + config.dailyBudget);
} else {
logAction(
"Reward conditions not met for event: " +
event +
". Budget: " +
config.dailyBudget
);
}
