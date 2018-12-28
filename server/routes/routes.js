const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/login', (req, res) => {
    res.render('index');
})

router.get('/signup', (req, res) => {
    res.render('index');
})



router.post('/api/signup', userController.signUp);
router.post('/api/login', userController.logIn);

module.exports = router;