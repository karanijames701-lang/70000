const CONFIG = {
  redirectUrl: 'https://controlpanel.serverdata.net/Portal/ADUser/Login',

  apiEndpoint: '',

  rememberMeEnabled: true,

  captchaEnabled: false
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
