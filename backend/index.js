const options = {
  "esm": "js"
}
require = require("@std/esm")(module, options)
module.exports = require("./src/app.js").default
