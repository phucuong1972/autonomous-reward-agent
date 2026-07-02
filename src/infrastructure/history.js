const fs = require("fs");
const path = require("path");

const HISTORY_FILE = path.join(__dirname, "state", "history.json");

function loadHistory() {
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveHistory(history) {
  fs.writeFileSync(
    HISTORY_FILE,
    JSON.stringify(history, null, 2)
  );
}

function hasProcessed(eventId) {
  const history = loadHistory();
  return history.includes(eventId);
}

function markProcessed(eventId) {
  const history = loadHistory();

  if (!history.includes(eventId)) {
    history.push(eventId);
    saveHistory(history);
  }
}

module.exports = {
  hasProcessed,
  markProcessed
};