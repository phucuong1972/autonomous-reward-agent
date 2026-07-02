const { loadPolicy } = require("./policy-loader");

/**
 * Decision Engine
 *
 * Business rules come from policy,
 * not from hardcoded values.
 */

function decide(event, context) {
  try {
    const rewardPolicy = loadPolicy("reward-policy").reward;

    if (!event || !event.id) {
      return {
        action: "ERROR",
        reason: "INVALID_EVENT"
      };
    }

    if (context.hasProcessed(event.id)) {
      return {
        action: "IGNORE",
        reason: "ALREADY_PROCESSED"
      };
    }

    if (!context.shouldRetry(event.id)) {
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
        reason: "EVENT_NOT_VERIFIED"
      };
    }

    if (event.score < rewardPolicy.minimumScore) {
      return {
        action: "IGNORE",
        reason: "LOW_SCORE"
      };
    }

    if (event.score >= rewardPolicy.bonusScore) {
      return {
        action: "REWARD",
        reward: rewardPolicy.bonusReward,
        reason: "HIGH_SCORE"
      };
    }

    return {
      action: "REWARD",
      reward: rewardPolicy.standardReward,
      reason: "STANDARD_SCORE"
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