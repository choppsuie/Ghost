export interface MockDirectSecp256k1HdWallet {
  getAccounts(): Promise<Array<{ address: string; pubkey: Uint8Array }>>
}

export interface MockStargateClient {
  getBalance(address: string, denom: string): Promise<{ amount: string; denom: string }>
  disconnect(): void
}

export const DirectSecp256k1HdWallet = {
  fromMnemonic: async (mnemonic: string): Promise<MockDirectSecp256k1HdWallet> => {
    return {
      getAccounts: async () => [
        {
          address: "sent1mock" + Math.random().toString(36).substring(7),
          pubkey: new Uint8Array(33),
        },
      ],
    }
  },
}

export const StargateClient = {
  connect: async (endpoint: string): Promise<MockStargateClient> => {
    return {
      getBalance: async (address: string, denom: string) => ({
        amount: Math.floor(Math.random() * 1000000).toString(),
        denom,
      }),
      disconnect: () => {},
    }
  },
}

export const stringToPath = (path: string) => [44, 118, 0, 0, 0]
