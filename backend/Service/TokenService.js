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

                    // brings back a string token
                    resolve(token)

                }
            )
        })
    }


    const validateToken = async(token) => {

        return new Promise((resolve, reject) => { 
            // verify a token symmetric
            jsonwebtoken.verify(token, 'secret', function(err, decoded) {
                // default result
                let returnObject = {
                    isSuccess: false,
                    decoded: {}
                }

                if(err) {
                    reject(err)
                }

                returnObject = {
                    isSuccess: true,
                    decoded
                }

                resolve(returnObject)
            });
        })

    }


    return {
        getUserToken,
        validateToken
    }
}

module.exports = TokenService()