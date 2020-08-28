// import Axios from 'axios'
// import { validateToken } from '../../../../backend/Service/TokenService'


function TokenService() {

    const jwtLocalStoreKey = 'jwt'

    /**
     * Function will store given jwt to local storage
     * @param {string} jwt 
     */
    const setTokenToLocalStorage = jwt => localStorage.setItem(jwtLocalStoreKey, jwt)

    /**
     * Function will retrieve jwt from localstore, will always return a string. where empty string means no token
     */
    const retrieveTokenFromLocalStore = () => localStorage.getItem(jwtLocalStoreKey) || ''

    /**
     * Function will remove the jwt from local storage
     */
    const removeTokenFromStorage = () => localStorage.removeItem(jwtLocalStoreKey)


    return {
        setTokenToLocalStorage,
        retrieveTokenFromLocalStore,
        removeTokenFromStorage,
    }
    
}

export default TokenService()