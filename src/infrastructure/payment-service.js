const logAction = require("../logger");

async function sendReward(
  sphere,
  {
    recipient,
    amount,
    coinId = "TEST",
    memo = "Autonomous reward"
  }
) {
  try {

    logAction("Initializing payment service...");

    const request = {
      recipient,
      amount,
      coinId,
      memo
    };

    logAction("Submitting payment request...");

    const result = await sphere.payments.send(request);

    logAction("Payment successful.");

    return {
      success: true,
      result
    };

  } catch (err) {

    logAction("Payment failed: " + err.message);

    return {
      success: false,
      error: err.message,
      code: err.code || "UNKNOWN_ERROR"
    };

  }
}

module.exports = {
  sendReward
};