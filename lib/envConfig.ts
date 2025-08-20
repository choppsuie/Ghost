// Environment configuration for Sentinel integration
export const sentinelConfig = {
  // Sentinel Network Configuration
  rpcEndpoint: process.env.SENTINEL_RPC_ENDPOINT || "https://rpc.sentinel.co:443",
  chainId: process.env.SENTINEL_CHAIN_ID || "sentinelhub-2",
  walletMnemonic: process.env.SENTINEL_WALLET_MNEMONIC,

  // DVPN Token Configuration
  tokenDenom: process.env.DVPN_TOKEN_DENOM || "udvpn",
  gasPrice: process.env.SENTINEL_GAS_PRICE || "0.1udvpn",

  // Network Settings
  networkPrefix: process.env.SENTINEL_PREFIX || "sent",

  // Development Mode
  isDevelopment: process.env.NODE_ENV === "development",
  useMockData: process.env.USE_MOCK_SENTINEL === "true",
}

// Validate required environment variables
export function validateSentinelConfig(): string[] {
  const errors: string[] = []

  if (!sentinelConfig.walletMnemonic && !sentinelConfig.useMockData) {
    errors.push("SENTINEL_WALLET_MNEMONIC is required for production")
  }

  if (!sentinelConfig.rpcEndpoint) {
    errors.push("SENTINEL_RPC_ENDPOINT is required")
  }

  return errors
}
