/// Main agent entry point

const config = require("../config/config.json");
const checkRewardRule = require("./rules");
const sendReward = require("./rewards");
const logAction = require("./logger");
const getDirectId = require("./get-wallet-id");
const { initializeSphere } = require("./sphere");

async function main() {
  const sphere = await initializeSphere();

  try {
    logAction("Starting " + config.agentName);
    logAction("Sphere runtime initialized");
    logAction("Agent identity: " + getDirectId());
    logAction("DIRECT address: " + sphere.identity.directAddress);
    logAction("Nametag: " + sphere.identity.nametag);

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

      const remainingBudget =
        config.dailyBudget - config.rewardAmount;

      logAction("Remaining budget: " + remainingBudget);
    } else {
      logAction(
        "Reward conditions not met for event: " +
          event +
          ". Budget: " +
          config.dailyBudget
      );
    }

    console.log("Destroying Sphere...");

    if (typeof sphere.destroy === "function") {
      await sphere.destroy();
    }

    console.log("Sphere destroyed.");
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
}

main();