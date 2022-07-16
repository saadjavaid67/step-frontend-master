const siteConfig = {
  siteName: process.env.REACT_APP_NAME,
  siteIcon: 'ion-flash',
  footerText: process.env.REACT_APP_FOOTER,
  siteLogo: process.env.REACT_APP_LOGO
};

const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault'
};
const language = 'english';

const local = {
  apiConfig: {
    fetchUrl: '//setps.backend-api-server' //Localhost
  },
  paypalConfig: {
    client: {
      sandbox: 'ATaE6vSzrdr0iJoTfk5lRq0MEkMJdsQAXbf6Xy6j9lMKvZrcZOkthz4XAis-ncZqK5i7d02BXkgTkXtZ',
      production: 'ATaE6vSzrdr0iJoTfk5lRq0MEkMJdsQAXbf6Xy6j9lMKvZrcZOkthz4XAis-ncZqK5i7d02BXkgTkXtZ',
    },
    env: 'sandbox'
  }
}

const dev = {
  apiConfig: {
    fetchUrl: '//api.steps.cloud-dev.horizontech.com.hk'
  },
  paypalConfig: {
    client: {
      sandbox: 'ATaE6vSzrdr0iJoTfk5lRq0MEkMJdsQAXbf6Xy6j9lMKvZrcZOkthz4XAis-ncZqK5i7d02BXkgTkXtZ',
      production: 'ATaE6vSzrdr0iJoTfk5lRq0MEkMJdsQAXbf6Xy6j9lMKvZrcZOkthz4XAis-ncZqK5i7d02BXkgTkXtZ',
    },
    env: 'sandbox'
  }
}

const uat = {
  apiConfig: {
    fetchUrl: 'TBC'
  },
  paypalConfig: {
    client: {
      sandbox: 'TBC',
      production: 'TBC',
    },
    env: 'sandbox'
  }
}

const prod = {
  apiConfig: {
    fetchUrl: 'TBC'
  },
  paypalConfig: {
    client: {
      sandbox: 'TBC',
      production: 'TBC',
    },
    env: 'sandbox'
  }
}

let apiConfig = {};
let paypalConfig = {};
switch (process.env.REACT_APP_STAGE) {
  case "prod":
    apiConfig = prod.apiConfig;
    paypalConfig = prod.paypalConfig;
    break;
  case "uat":
    apiConfig = uat.apiConfig;
    paypalConfig = uat.paypalConfig;
    break;
  case "dev":
    apiConfig = dev.apiConfig;
    paypalConfig = dev.paypalConfig;
    break;
  case "local":
    apiConfig = local.apiConfig;
    paypalConfig = local.paypalConfig;
    break;
  default:
    break;
}
export {
  siteConfig,
  themeConfig,
  language,
  apiConfig,
  paypalConfig,
};
