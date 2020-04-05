// Anything that was defined in /public/env-config.js (this file is created via docker for deployment reasons so we can
// specify the API_URL, for example)
let windowEnvironment = window._env_;
if (windowEnvironment === undefined) {
  windowEnvironment = {};
}

export const Constants = {
    apiUrl:
        (windowEnvironment.REACT_APP_API_URL 
        || process.env.REACT_APP_API_URL),
    isDev:
        (windowEnvironment.ENV === 'development' ||
        process.env.NODE_ENV === 'development'),
    isProd:
        (windowEnvironment.ENV === 'production' ||
        process.env.NODE_ENV === 'production'),
    idpUrl:
        (windowEnvironment.REACT_APP_IDP_URL 
        || process.env.REACT_APP_IDP_URL),
    clientId: 
        (windowEnvironment.CLIENT_ID 
        || process.env.CLIENT_ID),
    appUrl: 
        (windowEnvironment.REACT_APP_URL 
        || process.env.REACT_APP_URL),
};
