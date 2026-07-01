// Reward rules file

const config = require("../config/config.json");

function checkRewardRule() {
return config.dailyBudget >= config.rewardAmount;
}

module.exports = checkRewardRule;
