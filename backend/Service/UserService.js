// This file contains all the routes for the following Model
const User = require('./../models/user.model')
const EncryptionService = require('./EncryptionService')

const spaced = '\n\n\n'

function UserService() {

    const getUserByUsername = async (username) =>
    {
        try {
            const _user = await User.findOne({username})
            return _user
        } catch (error) {
            // may mean the user does not Exist...
            return null
        }
    }


    /**
     * Logic for retrieving all the users from the db
     */
    const getAllUsers = async () => User.find()


    /**
     * Logic for adding a new user to the db
     * @param {string} username 
     * @param {string} password
     */
    const addNew = async (username, password) => {

        const encryptedPassword = await EncryptionService.hash(password)
        const newUser = new User({username, password: encryptedPassword})
        const UserRecord = await newUser.save()
        return UserRecord
    }


    return {
        getAllUsers,
        addNew,
        getUserByUsername
    }

}



module.exports = UserService()