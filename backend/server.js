// allows us to read from .env file from process.env object
require('dotenv').config()

const express           = require('express')
const app               = express()

// attempting to avoid this... with proxy....
const cors              = require('cors')

const mongoose          = require('mongoose')
const Controller        = require('./Classes/ControllerClass')
const morgan            = require('morgan')
const port              = parseInt(process.env.PORT) || 5000

// Service Imports
const SettingsService   = require('./Service/SettingsService')
const LoggingService    = require('./Service/LoggingService')

// reading JWT settings from config...
const JWT_SECRET        = process.env.JWT_SECRET
const JWT_EXPIRESIN     = process.env.JWT_EXPIRESIN
const SkipAuth          = process.env.skipAuthentication === "true"

SettingsService.setJwt(JWT_SECRET, JWT_EXPIRESIN, SkipAuth)

const isDevMode = process.env.MODE.toLowerCase() === "development"


if(isDevMode) {
    LoggingService.infoLog(`JWT_SECRET: ${JWT_SECRET}`, 3, 2)
    LoggingService.infoLog(`JWT_EXPIRESIN: ${JWT_EXPIRESIN}`, 3, 2)
}

// TALK TO TEAM....I CANT GET READ THIS FROM .env file for some reason...
const connString    = process.env.ATLAS_URI || "mongodb+srv://mern123:mern@123@cluster0.r2mep.gcp.mongodb.net/test?retryWrites=true&w=majority"


/* 
    Setting up application Controllers...
    We add more right here... 
    and we store in this path...
*/
const allControllers = [
    new Controller({routePath: '/users', router: require('./routes/users')}),
]

// WE ONLY ADD THIS ROUTE IF WE ARE IN DEV MODE
if(isDevMode) allControllers.push(new Controller({routePath: '/utility', router: require('./routes/utility')}))

// SETTING UP FUNCTIONS HERE

/**
 * Sets up middlewares here.
 */
async function asyncMiddlewareSetup()
{
    // allows us to access our routes from outside the origin
    app.use(cors())

    // middleware that will log all http calls to console
    app.use(morgan('tiny'))


    /* 
        Allows us to read from body as JSON...
        This is a built-in middleware function in Express. 
        It parses incoming requests with JSON payloads and is based on body-parser.
    */
    app.use(express.json())

    // setting up our application routes
    allControllers.forEach((ctrl, index) => {
        app.use(ctrl.routePath, ctrl.router)
    })

    app.get('/authSettings', (req, res) => {
        // res gets proxied to root
        res.send({SkipAuth})
    })


    // Giving Credit to debanshu45
    app.all("*", (req,res) => {
        res.status(404).send({msg: "Route Not Found"})
    })



}

async function asyncMongoConnect()
{

    mongoose.connect(connString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then((con) => {

        LoggingService.infoLog("DB connection Successfully!", 3, 2)
        LoggingService.confirmLog("visit /utility/displaysRoutes to get information about available routes", 3, 2)

    }).catch((err)=>{
        LoggingService.importantLog("ERROR CONNECTING TO MONGO DB", 3, 2)
        console.warn(err)

    })
}


// Start the server
const ApplicationServerInstance = app.listen(port,async () => {

    // we are going to settup middleware right here...
    await asyncMiddlewareSetup()
    // then we connect to Mongo once our app starts...
    await asyncMongoConnect()
    // logging to tell users what paths we will have access to...
    LoggingService.infoLog(`Server is running on port: ${port}`, 3, 2)
    // console.log(`Server is running on port: ${port}`)

})