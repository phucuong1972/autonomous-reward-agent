const config = require("../config/config.json");
const logAction = require("./logger");
const { getEvents } = require("./event-source");
const { decide } = require("./decision-engine");

const {
  hasProcessed,
  markProcessed
} = require("./history");

const {
  shouldRetry,
  recordFailure,
  clearRetry
} = require("./retry-manager");

const { sendReward } = require("./payment-service");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executeAction(action, event, sphere) {

  switch (action.action) {

    case "REWARD": {

      logAction(
        `Action: REWARD (${action.reward} tokens)`
      );

      const payment = await sendReward(sphere, {
        recipient: sphere.identity.directAddress,
        amount: action.reward
      });

      if (payment.success) {

        markProcessed(event.id);
        clearRetry(event.id);

        logAction(
          `Rewarded ${event.user} with ${action.reward} tokens`
        );

      } else {

        recordFailure(event.id);

        logAction(
          "Reward failed: " + payment.error
        );

      }

      break;
    }

    case "IGNORE":

      logAction(
        `Action: IGNORE (${action.reason})`
      );

      break;

    case "RETRY":

      logAction(
        `Action: RETRY (${action.reason})`
      );

      break;

    case "ERROR":

      logAction(
        `Action: ERROR (${action.reason})`
      );

      break;
  }
}

async function processEvent(event, sphere) {

  logAction(
    `Processing ${event.id} | user=${event.user} | score=${event.score} | verified=${event.verified}`
  );

  const action = decide(event, {
    hasProcessed,
    shouldRetry
  });

  await executeAction(action, event, sphere);
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