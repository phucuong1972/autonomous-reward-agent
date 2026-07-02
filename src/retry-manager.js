const retries = new Map();

function shouldRetry(eventId) {
  const info = retries.get(eventId);

  if (!info) {
    return true;
  }

  return Date.now() >= info.nextRetry;
}

function recordFailure(eventId) {
  const info = retries.get(eventId) || {
    attempts: 0
  };

  info.attempts += 1;

  // Retry schedule
  // 1st failure  -> 1 minute
  // 2nd failure  -> 5 minutes
  // 3rd+ failure -> 30 minutes

  let delay = 60000;

  if (info.attempts >= 2) {
    delay = 300000;
  }

  if (info.attempts >= 3) {
    delay = 1800000;
  }

  info.nextRetry = Date.now() + delay;

  retries.set(eventId, info);
}

function clearRetry(eventId) {
  retries.delete(eventId);
}

module.exports = {
  shouldRetry,
  recordFailure,
  clearRetry
};