const fs = require("fs");
const path = require("path");

const LEDGER_FILE = path.join(
  __dirname,
  "state",
  "reward-ledger.json"
);

function loadLedger() {
  try {
    return JSON.parse(
      fs.readFileSync(LEDGER_FILE, "utf8")
    );
  } catch {
    return [];
  }
}

function saveLedger(entries) {
  fs.writeFileSync(
    LEDGER_FILE,
    JSON.stringify(entries, null, 2)
  );
}

function addEntry({
  eventId,
  status,
  amount,
  recipient,
  reason = null
}) {
  const ledger = loadLedger();

  ledger.push({
    eventId,
    status,
    amount,
    recipient,
    reason,
    timestamp: new Date().toISOString()
  });

  saveLedger(ledger);
}

function getLedger() {
  return loadLedger();
}

module.exports = {
  addEntry,
  getLedger
};