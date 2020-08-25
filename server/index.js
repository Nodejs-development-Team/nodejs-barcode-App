const AppService = require("./app.js")
// allows us to read config values from .env file using process.env[configName]
require("dotenv").config()

const port = parseInt(process.env.port) || 8080

const AppSettings = {
    port: port
}

new AppService(AppSettings).start()