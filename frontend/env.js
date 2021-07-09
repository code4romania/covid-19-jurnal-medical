const fs = require("fs");

const data = {
  test: {
    REACT_APP_IDP_URL: "https://dev-is.stamacasa.ro",
    REACT_APP_URL: "http://localhost:3000",
    REACT_APP_API_URL: "https://dev-api.stamacasa.ro"
  },
  development: {
    REACT_APP_IDP_URL: "http://localhost:5001",
    REACT_APP_URL: "http://localhost:3000",
    REACT_APP_API_URL: "http://localhost:5008"
  }
};

const env = process.env.NODE_ENV || "development";

const content = `window._env_ = {
  REACT_APP_IDP_URL: "${data[env].REACT_APP_IDP_URL}",
  REACT_APP_URL: "${data[env].REACT_APP_URL}",
  REACT_APP_API_URL: "${data[env].REACT_APP_API_URL}",
  CLIENT_ID: "js"
};`;

try {
  fs.writeFileSync("./public/env-config.js", content);
  console.info("🚀 File `env-config.js` written successfully");
} catch (err) {
  console.error(err);
}
