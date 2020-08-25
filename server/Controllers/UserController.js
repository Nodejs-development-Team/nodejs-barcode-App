const RouteBase = require("./../Util/ControllerBase")

class UserRoute extends RouteBase
{
    constructor() {
        super('/user')
        this.configureRouter()
    }


    configureRouter()
    {
        /**
         * @Access: Public
         * @Description: returns static data for testing reasons
         */
        this.router.get('/', (req, res) => {
            res.send({routeName: "user"})
        })

        /**
         * @Access: Public
         * @Description: Route used to have a user login with username and password
         */
        this.router.post('/authenticate', (req, res) => {

            res.send(
                {
                    msg:        "I can see this too",
                    name:       "Wendell",
                    // these are read from the BODY
                    email:      req.body.email, 
                    password:   req.body.password, 
                    userid:     req.body.userid
                }
            )

        })

    }
}

module.exports = new UserRoute()