const jsonwebtoken  = require('jsonwebtoken')



function TokenService() {

    const getUserToken = (payload) =>
    {

        return new Promise((resolve, reject) => {

            jsonwebtoken.sign(
                payload, 
                "secret",//should come from .env or something...
                { expiresIn: '1d' },
                (error, token) => 
                {
                    if(error) {
                        reject(error)
                    }

                    resolve({
                        token
                    })

                }
            )
        })
    }



    return {
        getUserToken
    }
}

module.exports = TokenService()