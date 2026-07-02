function buildKnowledge(observation) {

  return {
    observation,

    facts: {
      eventType: observation.observations.eventType,
      user: observation.observations.user,
      score: observation.observations.score,
      verified: observation.observations.verified,
      eventId: observation.observations.eventId
    },

    derived: {
      isHighScore: observation.observations.score >= 70,
      isLowScore: observation.observations.score < 40,
      isVerified: observation.observations.verified === true
    }
  };

}

module.exports = {
  buildKnowledge
};