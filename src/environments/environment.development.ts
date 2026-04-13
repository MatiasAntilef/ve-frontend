export const environment = {
  production: false,
  auth: {
    authority: 'https://cognito-idp.sa-east-1.amazonaws.com/sa-east-1_E20MLbcRM',
    redirectUrl: 'http://localhost:4200/dashboard',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: '7alqbt8mef5vu02fs6mo1db7b6',
    scope: 'openid profile email',
  },
};
