export const environment = {
  production: true,
  auth: {
    authority: 'https://cognito-idp.sa-east-1.amazonaws.com/sa-east-1_E20MLbcRM',
    clientId: 'please-enter-clientId',
    scope: 'openid profile email',
    redirectUrl: 'http://localhost:4200/auth',
    postLogoutRedirectUri: 'http://localhost:4200/',
  },
};
