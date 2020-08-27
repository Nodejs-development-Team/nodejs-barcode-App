// NOTE TO ALL DEVS! router Will need to be imported to all routes!
const router = require('express').Router()
// This file contains all the routes for the following Model
const User = require('./../models/user.model')

// ServiceLayer
const UserService = require('./../Service/UserService')
const EncryptionService = require('./../Service/EncryptionService')
const TokenService = require('./../Service/TokenService')

/**
 * @description: Route will be used to add a new user to the db
 * @access: Public
 */
router.post('/add', async (req, res) => {
  const { username, password } = req.body
  try {
    const userReference = await UserService.add(username, password)
    res.send(userReference)
    /*
    const userRef =  await UserService.getUserByUsername(username)
    // if user exist we dont try to add the record and we return the msg
    if(userRef) {
      res.send({user: {}, isSuccess: false, msg: 'User already exists'})
    } else {
      // if user does not exist we return the following...
      const userRecord = await UserService.addNew(username, password)
      res.send({user: userRecord, isSuccess: true, msg: 'new User Added'})
    }
    */

  } catch (error) {
    console.log(error)
    res.send({user: {}, isSuccess: false})
  }
})



/**
 * @description: Route will be used to read all users from the database
 * @access: Public
 */
router.get('/readAll', async (req, res) => {
  try {
    const allUsers = await UserService.getAllUsers()
    res.send({allUsers})
  } catch (error) {
    res.send({allUsers: []})
  }
})




// Work in Progress
router.post('/signin', async (req, res) => {

  const { username, password } = req.body

  const UserRecord = await UserService.getUserByUsername(username)

  if(!UserRecord) {
    console.log("!UserRecord")
    res.send({msg: 'invalid credentials'})
  }
  if(UserRecord && UserRecord.password) {
    const isvalidpassword = await EncryptionService.verifyEncryptedPassword(password, UserRecord.password)

    if(isvalidpassword) {
      const payload = {
        user: {
            id: 'need to figure out what payload we care about here...',
        }
      }
      const userTokenResponse = await TokenService.getUserToken(payload)
      res.send(userTokenResponse)
    }
  }
  res.send({msg: 'invalid credentials'})

})

// Work in Progress
router.post('/signout', (req, res) => {
  res.send({msg: 'this is the signout route'})
})


// USE THIS IF YOU WISH TO DELETE ALL USER RECORDS...CAUTION
/*
router.get('/deleteAll',async (req, res) => {
  try {
    await User.deleteMany({ createdAt: { '$lte': new Date() } })
    res.send('all records deleted')
  } catch (error) {
    console.log(error)
    res.status(500).send('all records NOT deleted')
  }
})
*/



module.exports = router;