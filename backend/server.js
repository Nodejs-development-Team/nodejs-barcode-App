// allows us to read from .env file from process.env object
require('dotenv').config()

const express       = require('express')
const app           = express()
const cors          = require('cors')
const mongoose      = require('mongoose')
const Controller    = require('./Classes/ControllerClass')
const port          = parseInt(process.env.PORT) || 5000
const connString    = process.env.ATLAS_URI
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

}

async function asyncMongoConnect()
{
    mongoose.connect(connString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then((con) => {
        console.log('DB connection Successfully!');
    }).catch((err)=>{
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
    console.log(`Server is running on port: ${port}`)

})