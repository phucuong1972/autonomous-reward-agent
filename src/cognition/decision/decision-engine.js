const { loadPolicy } = require("../../policy-loader");

function decide(context) {

  try {

    const {
      event,
      services
    } = context;

    const rewardPolicy =
      loadPolicy("reward-policy").reward;

    const eventPolicy =
      loadPolicy("event-policy").events;

    if (!event || !event.id) {
      return {
        action: "ERROR",
        reason: "INVALID_EVENT"
      };
    }

    const eventConfig = eventPolicy[event.type];

    if (!eventConfig) {
      return {
        action: "IGNORE",
        reason: "UNKNOWN_EVENT_TYPE"
      };
    }

    if (!eventConfig.enabled) {
      return {
        action: "IGNORE",
        reason: "EVENT_DISABLED"
      };
    }

    if (!eventConfig.actions.includes("reward")) {
      return {
        action: "IGNORE",
        reason: "REWARD_NOT_ALLOWED"
      };
    }

    if (services.hasProcessed(event.id)) {
      return {
        action: "IGNORE",
        reason: "ALREADY_PROCESSED"
      };
    }

    if (!services.shouldRetry(event.id)) {
      return {
        action: "RETRY",
        reason: "WAITING_RETRY_WINDOW"
      };
    }

    if (
      rewardPolicy.requireVerification &&
      !event.verified
    ) {
      return {
        action: "IGNORE",
        reason: "VERIFICATION_REQUIRED"
      };
    }

    if (
      event.score < rewardPolicy.minimumScore
    ) {
      return {
        action: "IGNORE",
        reason: "LOW_SCORE"
      };
    }

    if (
      event.score >= rewardPolicy.bonusScore
    ) {
      return {
        action: "REWARD",
        reward: rewardPolicy.bonusReward,
        reason: "BONUS_REWARD"
      };
    }

    return {
      action: "REWARD",
      reward: rewardPolicy.standardReward,
      reason: "STANDARD_REWARD"
    };

  } catch (err) {

    return {
      action: "ERROR",
      reason: err.message
    };

  }

}

module.exports = {
  decide
};