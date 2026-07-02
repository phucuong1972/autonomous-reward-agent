const config = require("../config/config.json");

let generated = false;

async function getEvents() {

  // Temporary event source.
  // Later this will become:
  // - Sphere events
  // - REST API
  // - Webhook
  // - Blockchain events

  if (generated) {
    return [];
  }

  generated = true;

  return [
    {
      id: "task-001",
      name: config.eventName,
      createdAt: new Date().toISOString()
    }
  ];
}

module.exports = {
  getEvents
};