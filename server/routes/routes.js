const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const msgController = require('./../controller/msgController');
const memberController = require('./../controller/memberController')
const directMsgController = require('./../controller/directMsgController')

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/login', (req, res) => {
    res.render('index');
})

router.get('/signup', (req, res) => {
    res.render('index');
})

router.post('/api/message', msgController.postMsg);
router.post('/api/signup', userController.signUp);
router.post('/api/login', userController.logIn);
router.post('/api/join', memberController.joinChannel);
router.get('/api/batch1/members', memberController.getAllMembers);
router.get('/api/message', msgController.getMessage);
router.get('/api/whoami', userController.whoAmI);
router.get('/api/logout', userController.logout )
router.post('/api/direct', directMsgController.postDirectMsg)
router.get('/api/:from/direct/:to', directMsgController.getDirectMsg)


module.exports = router;