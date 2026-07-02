const logAction = require("../logger");

const retryState = new Map();

function shouldRetry(eventId) {
  const state = retryState.get(eventId);

  if (!state) {
    retryState.set(eventId, {
      attempts: 0,
      lastAttempt: 0
    });
    return true;
  }

  const now = Date.now();
  const timeSinceLast = now - state.lastAttempt;

  // simple backoff: 10 seconds
  if (timeSinceLast < 10000) {
    return false;
  }

  if (state.attempts >= 3) {
    return false;
  }

  return true;
}

function recordFailure(eventId) {
  const state = retryState.get(eventId) || {
    attempts: 0,
    lastAttempt: 0
  };

  state.attempts += 1;
  state.lastAttempt = Date.now();

  retryState.set(eventId, state);

  logAction(`Retry recorded for ${eventId} (attempt ${state.attempts})`);
}

function clearRetry(eventId) {
  retryState.delete(eventId);
}

module.exports = {
  shouldRetry,
  recordFailure,
  clearRetry
};