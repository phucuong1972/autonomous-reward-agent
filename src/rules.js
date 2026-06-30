// Reward rules file

const config = require("../config/config.json");

function checkRewardRule() {
return config.dailyBudget > 0;
}

module.exports = checkRewardRule;
