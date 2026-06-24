export interface LoginWithGoogle {
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        id: string,
        firstName: string,
        lastName: string,
        role: string,
        userStatus: string,
        profileImage: string,
        defaultProfile: string,
    }
}