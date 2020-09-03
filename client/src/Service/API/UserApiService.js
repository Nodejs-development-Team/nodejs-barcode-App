import Axios from 'axios'

function UserService() {


    const getAuthSettings = async () => Axios.get('/authSettings')

    /**
     * Function will be used to make HTTP calls to sign in where return will have
     * @param {string} username 
     * @param {string} password 
     * @returns { username, isSuccess, jwt,msg }
     */
    const signin = async (username, password) => Axios.post('/users/signin', {username, password})


    /**
     * Function will be used to make HTTP calls to determine if token is valid
     * @param {string} jwt 
     */
    const validateToken = jwt => Axios.post('/users/validateToken', {jwt})

    // public functions
    return {
        getAuthSettings,
        signin,
        validateToken
    }
}

export default UserService()