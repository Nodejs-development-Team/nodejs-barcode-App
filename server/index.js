const AppService = require("./app.js")
// allows us to read config values from .env file using process.env[configName]
require("dotenv").config()

const AppSettings = {
    port: parseInt(process.env.port)
}

new AppService(AppSettings).start()