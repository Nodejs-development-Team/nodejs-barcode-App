class RouteGroup 
{
    constructor(name)
    {
        this.name = name
        this.routes = []
    }

    addRoute(verb, path, access, description)
    {
        this.routes.push(new RouteDetail(verb, path, access, description))
    }
}

class RouteDetail
{
    constructor(verb, path, access, description)
    {
        this.verb           = verb
        this.path           = path
        this.access         = access
        this.description    = description
    }
}

class RoutingOptionService
{
    constructor()
    {
        if(RoutingOptionService.prototype._singleton)
            return RoutingOptionService.prototype._singleton
        RoutingOptionService.prototype._singleton = this
        this.Routes = []
    }

    newGroup(groupName) {
        const groupRef = new RouteGroup(groupName)
        this.Routes.push(groupRef)
        return groupRef
    }
}

module.exports = RoutingOptionService