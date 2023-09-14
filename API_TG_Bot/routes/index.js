const router = require('express').Router();
const { createUser, updateUser } = require('../controllers/users');
const {login, logout, createAdmin} = require('../controllers/admin');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createAdmin);

router.use(auth);

router.post('/users/signup', createUser);
router.post('/users/update', updateUser);

router.post('/signout', logout);

module.exports = router;