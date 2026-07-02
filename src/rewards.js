/// Real reward execution using Sphere Payments

const { initializeSphere } = require("./sphere");
const logAction = require("./logger");

async function sendReward(amount) {
  const sphere = await initializeSphere();

  try {
    const request = {
      recipient: sphere.identity.directAddress,
      coinId: "TEST",
      amount: amount,
      memo: "Self-test reward"
    };

    logAction("Sending real payment via Sphere...");

    const result = await sphere.payments.send(request);

    logAction("Payment completed: " + result.id);

    return result;
  } catch (err) {
    logAction("Payment failed: " + err.message);
    throw err;
  } finally {
    await sphere.destroy();
  }
}

module.exports = sendReward;