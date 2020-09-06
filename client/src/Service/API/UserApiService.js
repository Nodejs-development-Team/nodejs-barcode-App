import Axios from 'axios'

function UserService() {


    const getAuthSettings = async () => Axios.get('/authSettings')

    /**
     * Function will be used to make HTTP calls to sign in where return will have
     * @param {string} username 
     * @param {string} password 
     * @returns { username, isSuccess, jwt,msg }
     */
    const signin = async (email, password) => Axios.post('/users/signin', {email, password})


    /**
     * Function will be used to make HTTP calls to determine if token is valid
     * @param {string} jwt 
     */
    const validateToken = jwt => Axios.post('/users/validateToken', {jwt})


    const Signup = ({username, password, email}) => Axios.post('/users/add', {username, password, email})

    // public functions
    return {
        getAuthSettings,
        signin,
        validateToken,
        Signup
    }
}

export default UserService()