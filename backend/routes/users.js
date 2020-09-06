// NOTE TO ALL DEVS! router Will need to be imported to all routes!
const router = require('express').Router()

// ServiceLayer
const UserService = require('./../Service/UserService')
const EncryptionService = require('./../Service/EncryptionService')
const TokenService = require('./../Service/TokenService')
const RoutingOptionService = require('./../Service/RoutingOptionService')

const User = require('./../models/user.model')



const usersRouteLogger = new RoutingOptionService()
const usersRoutingGroup = usersRouteLogger.newGroup('users')





usersRoutingGroup.addRoute('POST','/users/add', 'Public', 'Route will be used to add a new user to the db')
/**
 * @description: Route will be used to add a new user to the db
 * @access: Public
 */
router.post('/add', async (req, res) => {
  const { username, password, email } = req.body
  try {
    // username, password, name
    const userReference = await UserService.add(username, password, email)
    res.send(userReference)
  } catch (error) {
    console.log(error)
    res.send({user: {}, isSuccess: false})
  }
})




// THIS ALLOWS ME TO VIEW INFO IN MY ROUTE
usersRoutingGroup.addRoute(
  'GET',
  '/users/readAll', 
  'Public', 
  'Route will be used to read all users from the database'
)
/**
 * @description: Route will be used to read all users from the database
 * @access: Public
 */
router.get('/readAll', async (req, res) => {
  try {
    const allUsersNoPass = await UserService.getAllUsers()
    res.send(allUsersNoPass)
  } catch (error) {
    res.send([])
  }
})



// THIS ALLOWS ME TO VIEW INFO IN MY ROUTE
usersRoutingGroup.addRoute(
  'post',
  '/users/signin', 
  'Public', 
  'Route will be used to sign a user in.'
)
// WORK IN PROGRESS
router.post('/signin', async (req, res) => {

  const { email, password } = req.body

  let badResponse = {
    email,
    isSuccess: false,
    jwt: '',
    msg: 'invalid credentials'
  }

  const UserRecord = await UserService.getUserByEmail(email)

  // if User does NOT exist
  if(!UserRecord) {
    console.log("!UserRecord")
    res.send(badResponse)
  }
  if(UserRecord && UserRecord.password) {
    const isvalidpassword = await EncryptionService.verifyEncryptedPassword(password, UserRecord.password)
    // would like to figure out what to send over in JWT...
    if(isvalidpassword) {
      const payload = {
          id: UserRecord.id,
          username: email
      }
      const jwt = await TokenService.getUserToken(payload)
      let goodResponse = {
        username: email,
        isSuccess: true,
        jwt,
        msg: 'user is authenticated'
      }
      res.send(goodResponse)
    }// end of if user has valid pw logic...
  } else {
    res.send(badResponse)
  }
})




usersRoutingGroup.addRoute('post','/users/signout', 'Public', 'Route will be used to sign a user out.')
// WORK IN PROGRESS
router.post('/signout', (req, res) => {
  res.send({msg: 'this is the signout route'})
})




usersRoutingGroup.addRoute('post','/users/validateToken', 'Public', 'Route will be used to validate a users token')
// WORK IN PROGRESS
/**
 * @description: Route will be used to validate a users token
 * @access: Public
 */
router.post('/validateToken', async (req, res) => {

  try {
    
    const { jwt } = req.body
    const tokenValidationObject = await TokenService.validateToken(jwt)
    res.send(tokenValidationObject)

  } catch (error) {

    console.log('\n\n\n')
    console.log('I DONT THIS THIS WORKED BROTHER')
    console.log('\n\n\n')

    res.send({
      isSuccess: false,
      decoded: {}
    })

  }
})




// USE THIS IF YOU WISH TO DELETE ALL USER RECORDS...CAUTION
router.get('/deleteAll',async (req, res) => {
  try {
    await User.deleteMany({ createdAt: { '$lte': new Date() } })
    res.send('all records deleted')
  } catch (error) {
    console.log(error)
    res.status(500).send('all records NOT deleted')
  }
})



module.exports = router