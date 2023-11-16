const router = require('express').Router();
const { createUser, updateUser, getUserMe } = require('../controllers/users');
const { createChart, updateChart, getChartMe } = require('../controllers/charts');
const { login, logout, createAdmin } = require('../controllers/admin');
const auth = require('../middlewares/auth');
const notFoundController = require('../controllers/notFoundController');

router.post('/signin', login);
router.post('/signup', createAdmin);

router.use(auth);

router.post('/users', createUser);
router.post('/users/update/:userId', updateUser);
router.get('/users/:userId', getUserMe);

router.post('/charts', createChart);
router.post('/charts/update/:chartId', updateChart);
router.get('/charts/:chartId', getChartMe);

router.post('/signout', logout);

router.use('*', notFoundController);

module.exports = router;