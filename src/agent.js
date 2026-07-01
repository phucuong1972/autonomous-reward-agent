/// Main agent entry point

const config = require("../config/config.json");
const checkRewardRule = require("./rules");
const sendReward = require("./rewards");
const logAction = require("./logger");

logAction("Starting " + config.agentName);
logAction("Listening for event: " + config.eventName);
logAction("Network: " + config.network);
logAction("Reward recipient: " + config.userId);
logAction("Agent initialization complete");

const event = config.eventName;

logAction("Received event: " + event);
logAction("Evaluating reward conditions");
logAction("Configured reward amount: " + config.rewardAmount);

if (event === config.eventName && checkRewardRule()) {
logAction("Reward conditions satisfied");
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
