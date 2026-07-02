const config = require("../config/config.json");
const logAction = require("./logger");
const getDirectId = require("./get-wallet-id");
const { initializeSphere } = require("./sphere");
const { startAgentLoop } = require("./agent-loop");

let sphere = null;
let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  logAction(`Received ${signal}. Shutting down agent...`);

  try {
    if (sphere && typeof sphere.destroy === "function") {
      await sphere.destroy();
      logAction("Sphere runtime stopped.");
    }
  } catch (err) {
    console.error(err);
  }

  logAction("Agent stopped.");

  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

async function main() {
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

    await startAgentLoop(sphere);

  } catch (err) {
    console.error(err);
    await shutdown("ERROR");
  }
}

main();