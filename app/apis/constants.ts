export const apis = {
    googleLogin: "/api/auth/google/login",
    refreshToken: "/api/auth/refresh",
    logout: "/api/auth/logout",
    createWallet: "/api/wallet",
    getWalletId: "/api/wallet/wallet-id",
    updateWalletAmount: (walletId: string) => `/api/wallet/${walletId}/amount`,
    getWalletDetails: (walletId: string) => `/api/wallet/${walletId}`,
    transferMoney: "/api/wallet/transfer",
    getWalletHistory: (walletId: string) => `/api/wallet/${walletId}/history`,
    schedulePayment: "/api/wallet/schedule",
    cancelScheduledPayment: (scheduleId: string) => `/api/wallet/schedule/${scheduleId}/cancel`,
    userProfile: 'api/me'
}