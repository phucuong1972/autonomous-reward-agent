const config = require("../config/config.json");

/**
 * Event Provider Interface (v1)
 * - returns array of events
 * - must be stateless or externally backed
 */

class MockEventProvider {
  constructor() {
    this.generated = false;
  }

  async getEvents() {
    // simulate 1-time event stream
    if (this.generated) return [];

    this.generated = true;

    return [
      {
        id: "task-001",
        type: config.eventName,
        timestamp: Date.now()
      }
    ];
  }
}

/**
 * Factory (future-proof)
 */
function createEventProvider() {
  // later we can switch by config:
  // if (config.provider === "sphere") return new SphereProvider();

  return new MockEventProvider();
}

const provider = createEventProvider();

async function getEvents() {
  return provider.getEvents();
}

module.exports = {
  getEvents
};