// NOTE TO ALL DEVS! router Will need to be imported to all routes!
const router = require('express').Router()

// ServiceLayer
const RoutingOptionService = require('./../Service/RoutingOptionService')
const utilityRouteLogger = new RoutingOptionService()
const utilityRoutingGroup = utilityRouteLogger.newGroup('utility')

utilityRoutingGroup.addRoute('GET','/utility/validateToken', 'Public', 'Route will be used to display available routes')
router.get('/displaysRoutes', (req, res) => {
    res.send(utilityRouteLogger.Routes)
})


module.exports = router