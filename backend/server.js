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

// reading JWT settings from config...
const JWT_SECRET        = process.env.JWT_SECRET
const JWT_EXPIRESIN     = process.env.JWT_EXPIRESIN
const SkipAuth          = process.env.skipAuthentication === "true"

SettingsService.setJwt(JWT_SECRET, JWT_EXPIRESIN, SkipAuth)




// Used to create spaced text...
let spaced = ''
for(let i = 0;i < 4;i++) spaced += '\n'

console.log(spaced)
console.log('JWT_SECRET ', JWT_SECRET)
console.log('JWT_EXPIRESIN ', JWT_EXPIRESIN)
console.log(spaced)

// TALK TO TEAM....I CANT GET READ THIS FROM .env file for some reason...
const connString    = process.env.ATLAS_URI || "mongodb+srv://mern123:mern@123@cluster0.r2mep.gcp.mongodb.net/test?retryWrites=true&w=majority"


/* 
    Setting up application Controllers...
    We add more right here... 
    and we store in this path...
*/
const allController = [
    new Controller({routePath: '/users', router: require('./routes/users')})
]


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
    allController.forEach((ctrl, index) => {
        console.log(`${index+1}.) routePath: ${ctrl.routePath}`)
        app.use(ctrl.routePath, ctrl.router)
    })

    app.get('/authSettings', (req, res) => {
        // res gets proxied to root
        res.send({SkipAuth})
    })


    // Giving Credit to debanshu45
    app.all("*", (req,res) => {
        console.log(spaced, req, spaced)
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
        console.log(spaced)
        console.log('DB connection Successfully!');
        console.log(spaced)
    }).catch((err)=>{
        console.log(spaced)
        console.log('ERROR CONNECTING TO MONGO DB')
        console.warn(err)
        console.log(spaced)
    })
}


// Start the server
const ApplicationServerInstance = app.listen(port,async () => {

    // we are going to settup middleware right here...
    await asyncMiddlewareSetup()
    // then we connect to Mongo once our app starts...
    await asyncMongoConnect()
    // logging to tell users what paths we will have access to...
    console.log(`Server is running on port: ${port}`)

})