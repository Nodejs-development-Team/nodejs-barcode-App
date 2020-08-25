// Dependencies added here...
const express = require('express')

// This class will be used in each Controller instance like in dotnet and will be served as a base
class ControllerBase
{
    /**
     * Will be the common base for all base routing
     * @param {string} uniquepath - determines the route prefix, how a route will start. 
     */
    constructor(uniquepath) {
        this.uniquepath = uniquepath
        this.router = express.Router()
    }

    /**
     * This function should get overwritten on instance class
     */
    configureRouter()
    {
        
        console.log('Route is not yet configured.')

        this.router.get('/', (req, res) => {
            res.send("Route is not yet configured.")
        })

    }
}

module.exports = ControllerBase