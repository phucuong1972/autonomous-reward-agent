const dotenv = require("dotenv");

dotenv.config();

async function initializeSphere() {
  const { Sphere } = await import("@unicitylabs/sphere-sdk");
  const { createNodeProviders } = await import(
    "@unicitylabs/sphere-sdk/impl/nodejs"
  );

  const providers = createNodeProviders({
    network: "testnet2",
    dataDir: "./wallet-data",
    tokensDir: "./tokens-data",
    oracle: {
      apiKey: process.env.UNICITY_ORACLE_API_KEY
    }
  });

  const { sphere } = await Sphere.init({
    ...providers,
    network: "testnet2",
    mnemonic: process.env.SPHERE_MNEMONIC,
    autoGenerate: false
  });

  return sphere;
}

module.exports = {
  initializeSphere
};