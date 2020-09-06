// This file contains all the routes for the following Model
const User = require('./../models/user.model')
const EncryptionService = require('./EncryptionService')

const spaced = '\n\n\n'

function UserService() {

    const getUserByUsername = async (username) =>
    {
        try {
            return await User.findOne({username})
        } catch (error) {
            return null
        }
    }

    const getUserByEmail = async (email) =>
    {
        try {
            return await User.findOne({email})
        } catch (error) {
            return null
        }
    }


    /**
     * Logic for retrieving all the users from the db
     */
    const getAllUsers = async (excludePassword=true) => {
        if(excludePassword) return await User.find().select("-password")
        return await User.find()
    }



    /**
     * Logic for adding a new user to the db
     * @param {string} username 
     * @param {string} password
     */
    const addNew = async (username, password, email) => {
        console.log(`addNew: username: ${username} password: ${password} email: ${email}`)
        const encryptedPassword = await EncryptionService.hash(password)
        const newUser = new User({
            username, 
            password: encryptedPassword, 
            email
        })
        const UserRecord = await newUser.save()
        return UserRecord
    }


    /**
     * Logic for adding a new user to the db
     * @param {string} username 
     * @param {string} password
     */
    const add = async (username, password, email) => {
        const userRef = await getUserByUsername(username)
        if(userRef) {
            return {user: {}, isSuccess: false, msg: 'User already exists'}
        } else {
          // if user does not exist we return the following...
          const userRecord = await addNew(username, password, email)
          return {user: userRecord, isSuccess: true, msg: 'new User Added'}
        }
    }


    return {
        getAllUsers,
        add,
        getUserByUsername,
        getUserByEmail
    }

}



module.exports = UserService()