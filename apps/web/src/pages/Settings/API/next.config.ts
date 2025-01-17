export default `
const axios = require("axios");

const API = axios.create({
  baseURL: "http://a-locolizer-api.domain/api",
})

const API_KEY = "YOUR_API_KEY";

module.exports = {
    i18n: {
      defaultLocale: 'ru',
      locales: ['az', 'en', 'ru'],
      react: {
        debug: true
      },
      serializeConfig: false,
    },
    backend: {
      queryStringParams: { v: new Date().getTime() },
      loadPath: '{{lng}}|{{ns}}',
      requestOptions: {
        cache: 'no-store',
      },
      reloadInterval: 3600000,
      request: (options, url, payload, callback) => {
        console.log(options, url, payload);
        const [lang, ns] = url.split("|")
        API.get(\`/get/\${API_KEY}/\${lang}/\${ns}\`)
        .then((resp) => {
          callback(null, {
            status: 200,
            data: resp.data
          })
        }).catch(() => {
          callback(null, {
            status: 200,
            data: {
              lol: "kek"
            }
          })
        })
      },
    },
    use: [
      require("i18next-http-backend")
    ]
  }

`