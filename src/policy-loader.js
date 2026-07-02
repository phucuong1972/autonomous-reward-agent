const fs = require("fs");
const path = require("path");

const cache = new Map();

function loadPolicy(policyName) {
  if (cache.has(policyName)) {
    return cache.get(policyName);
  }

  const filePath = path.join(
    __dirname,
    "..",
    "config",
    "policies",
    `${policyName}.json`
  );

  const policy = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  cache.set(policyName, policy);

  return policy;
}

function reloadPolicy(policyName) {
  cache.delete(policyName);
  return loadPolicy(policyName);
}

module.exports = {
  loadPolicy,
  reloadPolicy
};