const {Router} = require('express');
const route = Router();
const userController = require('../controllers/userController');

route.post('/api/auth/register', userController.register);
route.post('/api/auth/activation', userController.activate);
route.post('/api/auth/signing', userController.signing);
route.post('/api/auth/access', userController.access);
route.post('/api/auth/forgot_pass', userController.forgot);

module.exports = route;
