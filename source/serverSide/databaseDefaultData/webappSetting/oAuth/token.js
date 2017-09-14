let data = [
    {
        id: '',
        type: 'accessToken',
        accessToken: '',
        accessTokenExpiresAt: '',
        scope: '',
        clientId: '',
        userId: '',
    },
    {
        id: '',
        type: 'refreshToken',
        refreshToken: '',
        refreshTokenExpiresAt: '',
        scope: '',
        clientId: '',
        userId: '',
    },
    {
        id: '',
        type: 'authorizationCode',
        authorizationCode: '',
        authorizationCodeExpiresAt: '',
        redirectUri: '',
        scope: '',
        clientId: '',
        userId: '',
    }
];

module.exports = {
    databaseTableName: 'oAuth_token',
    data: data
}