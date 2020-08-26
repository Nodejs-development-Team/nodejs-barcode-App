const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



// Work in Progress
router.route('/signin').post((req, res) => {
  res.send({msg: 'this is the signin route'})
})

// Work in Progress
router.route('/signout').post((req, res) => {
  res.send({msg: 'this is the signout route'})
});

module.exports = router;