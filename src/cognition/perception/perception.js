function perceive(event) {
  return {
    observationId: event.id,

    observedAt: new Date().toISOString(),

    source: "event",

    observations: {
      eventId: event.id,
      eventType: event.type,
      user: event.user,
      score: event.score,
      verified: event.verified,
      timestamp: event.timestamp || null
    }
  };
}

module.exports = {
  perceive
};