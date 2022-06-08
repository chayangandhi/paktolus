var {getUserProfile} = require('./user')
const router = require('express').Router()

router.get('/profile', getUserProfile)

module.exports = router;
