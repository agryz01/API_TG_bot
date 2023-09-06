const router = require('express').Router();
const { createUser, updateUser } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/users', updateUser);

module.exports = router;