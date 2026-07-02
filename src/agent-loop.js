const config = require("../config/config.json");
const checkRewardRule = require("./rules");
const { sendReward } = require("./payment-service");
const logAction = require("./logger");
const {
  hasProcessed,
  markProcessed
} = require("./history");
const {
  shouldRetry,
  recordFailure,
  clearRetry
} = require("./retry-manager");
const { getEvents } = require("./event-source");
const { addEntry } = require("./reward-ledger");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processEvent(event, sphere) {
  if (hasProcessed(event.id)) {
    logAction("Skipping processed event: " + event.id);
    return;
  }

  if (!shouldRetry(event.id)) {
    logAction("Waiting before retrying event: " + event.id);
    return;
  }

  logAction("Processing event: " + event.id);

  if (!checkRewardRule()) {
    logAction("Reward conditions not satisfied.");

    addEntry({
      eventId: event.id,
      status: "RULE_NOT_SATISFIED",
      amount: config.rewardAmount,
      recipient: sphere.identity.directAddress
    });

    return;
  }

  logAction("Reward conditions satisfied.");

  const payment = await sendReward(sphere, {
    recipient: sphere.identity.directAddress,
    amount: config.rewardAmount
  });

  if (payment.success) {
    logAction("Reward payment completed.");

    addEntry({
      eventId: event.id,
      status: "SUCCESS",
      amount: config.rewardAmount,
      recipient: sphere.identity.directAddress
    });

    markProcessed(event.id);
    clearRetry(event.id);

  } else {

    logAction(
      "Reward skipped: " +
      payment.code +
      " - " +
      payment.error
    );

    addEntry({
      eventId: event.id,
      status: "FAILED",
      amount: config.rewardAmount,
      recipient: sphere.identity.directAddress,
      reason: payment.code
    });

    recordFailure(event.id);
  }
}

async function startAgentLoop(sphere) {
  logAction("Agent loop started.");

  while (true) {
    try {
      const events = await getEvents();

      if (events.length === 0) {
        logAction("No new events.");
      } else {
        for (const event of events) {
          await processEvent(event, sphere);
        }
      }

    } catch (err) {
      logAction("Loop error: " + err.message);
    }

    logAction("Sleeping for 10 seconds...");
    await sleep(10000);
  }
}

module.exports = {
  startAgentLoop
};