const config = require("../../config/config.json");

/**
 * Temporary mock event source
 * (we will replace later with real stream)
 */

function getEvents() {

  const sampleEvents = [
    {
      id: "task-1",
      type: "task_completed",
      user: "alice",
      score: Math.floor(Math.random() * 100),
      verified: true
    },
    {
      id: "task-2",
      type: "reward_requested",
      user: "bob",
      score: Math.floor(Math.random() * 100),
      verified: Math.random() > 0.5
    },
    {
      id: "task-3",
      type: "task_failed",
      user: "charlie",
      score: Math.floor(Math.random() * 100),
      verified: false
    }
  ];

  return sampleEvents;
}

module.exports = {
  getEvents
};