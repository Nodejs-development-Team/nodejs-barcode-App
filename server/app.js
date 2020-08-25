// dep. imports stated here
const express = require('express')
const fs = require('fs')
const path = require('path')




/**
 * Class is Responsible for Setting up an instance of the Application Server which will run the application...
 */
class AppService
{
    constructor({port})
    {
        this.port = port
        this.app = express()
    }

    /**
     * Function is used to setup any middleware like in dotnet
     * @Access: Private
     */
    _middlewares()
    {
        this.app.use(express.json())
    }

    /**
     * Function that will bind routes set inside the Controller directory where each class in directory will inherit ControllerBase
     * @Access: Private
     */
    _bindAppRoutes()
    {
        const controllerPath = path.join(__dirname, "Controllers");
        fs.readdirSync(controllerPath).forEach((file) => {
            let controllerFilePath = path.resolve(controllerPath, file)
            let r = require(controllerFilePath)
            this.app.use(r.uniquepath, r.router)
        })
    }

    /**
     * Function Responsible for Binding Routes, setting mongoDbConnection, and any other application configuration...
     * @Access: Public
     */
    start() {
        try {
            this._middlewares()
            this.app.listen(this.port, () => {
                console.log(`Application is running on port ${this.port}`)
                this._bindAppRoutes()
            })
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = AppService