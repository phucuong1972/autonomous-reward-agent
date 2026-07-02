/// Agent bootstrap

const config = require("../config/config.json");
const logAction = require("./logger");
const getDirectId = require("./get-wallet-id");
const { initializeSphere } = require("./sphere");
const { startAgentLoop } = require("./agent-loop");

async function main() {
  let sphere;

  try {
    sphere = await initializeSphere();

    logAction("Starting " + config.agentName);
    logAction("Sphere runtime initialized");

    logAction("Agent identity: " + getDirectId());
    logAction("DIRECT address: " + sphere.identity.directAddress);
    logAction("Nametag: " + sphere.identity.nametag);

    logAction("Listening for event: " + config.eventName);
    logAction("Network: " + config.network);
    logAction("Reward recipient: " + config.userId);

    logAction("Agent initialization complete");

    // Start the autonomous loop.
    await startAgentLoop(sphere);

  } catch (err) {
    console.error(err);
  } finally {
    if (sphere) {
      console.log("Destroying Sphere...");

      if (typeof sphere.destroy === "function") {
        await sphere.destroy();
      }

      console.log("Sphere destroyed.");
    }

    process.exit(0);
  }
}

main();