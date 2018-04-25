var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://10.60.0.57:81/api"',
  REDIRECT: '"home"',
  SNACKBAR_TIMEOUT: '"5000"'
})
