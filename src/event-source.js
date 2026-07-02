const config = require("../config/config.json");

/**
 * Event Queue Simulator (v2)
 *
 * Simulates realistic completed tasks.
 */

class EventQueue {
  constructor() {
    this.queue = [];
    this.counter = 1;
  }

  generateBatch() {
    const chance = Math.random();

    if (chance < 0.5) {
      return [];
    }

    const batchSize = chance < 0.8 ? 1 : 3;

    return this.createEvents(batchSize);
  }

  createEvents(count) {
    const events = [];

    const users = [
      "alice",
      "bob",
      "charlie",
      "david",
      "eva"
    ];

    for (let i = 0; i < count; i++) {

      const score = Math.floor(Math.random() * 101);

      events.push({
        id: `task-${this.counter++}`,

        type: config.eventName,

        user: users[Math.floor(Math.random() * users.length)],

        verified: Math.random() > 0.15,

        score,

        reward: score >= 80 ? 10 : 5,

        timestamp: Date.now()
      });
    }

    return events;
  }

  async getEvents() {

    const newEvents = this.generateBatch();

    if (newEvents.length > 0) {
      this.queue.push(...newEvents);
    }

    return this.queue.splice(0, 2);
  }
}

const provider = new EventQueue();

async function getEvents() {
  return provider.getEvents();
}

module.exports = {
  getEvents
};