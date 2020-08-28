function SettingsService() 
{
    let jwt = {
        secret: '',
        expiresin: ''
    }

    const getJwt = () => {
        return {...jwt}
    }

    const setJwt = (secret, expiresin) => {
        jwt = {...jwt, secret, expiresin}
    }

    return {
        getJwt,
        setJwt
    }

}


module.exports = SettingsService()