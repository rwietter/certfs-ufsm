/* eslint-disable turbo/no-undeclared-env-vars */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  env: {
    THIRDWEB_PUBLIC: process.env.THIRDWEB_PUBLIC,
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_API_SECRET: process.env.PINATA_API_SECRET,
    FANTON_SMART_CONTRACT_ADDRESS: process.env.NEW_FANTON_SMART_CONTRACT_ADDRESS,
  }
};
