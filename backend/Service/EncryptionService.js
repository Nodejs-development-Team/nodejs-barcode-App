// const bcrypt = require("bcrypt");
const bcrypt = require('bcrypt')


function Encryption() 
{
    
    /**
     * Function that will encrypt data such as a password
     * @param {string} plainTextString 
     * @return Promise<string>
     */
    const hash = async (plainTextString) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainTextString, salt)
    }


    /**
     * Function that will confirm if password is correct
     * @param {string} plainPassword 
     * @param {string} encryptedPassword 
     * @return Promise<boolean>, if callback has been omitted
     */
    const verifyEncryptedPassword = async (plainPassword, encryptedPassword) =>
    {
        const isMatch = await bcrypt.compare(plainPassword, encryptedPassword)
        return isMatch
    }


    return {
        hash,
        verifyEncryptedPassword
    }
}


module.exports = Encryption()