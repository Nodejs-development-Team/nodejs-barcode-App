const RouteBase = require("./../Util/ControllerBase")

class RootRoute extends RouteBase
{
    constructor() {
        super('/')
        this.configureRouter()
    }

    configureRouter()
    {
        this.router.get('/', (req, res) => {
            res.send("Hello Team-mates")
        })
        this.router.get('/test', (req, res) => {
            res.send({msg: "I can see this too"})
        })
    }
}
module.exports = new RootRoute()