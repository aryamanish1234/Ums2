const express = require('express');
const  router = express.Router();
const userControllers = require("../controllers/userControllers");
const authlogin = require('../middleware/authcheck');


router.get('/home',  [userControllers.allUsers] );
router.get('/', userControllers.Login);
router.post('/', userControllers.login)
router.get('/create', userControllers.crateUser);
router.post('/create', userControllers.adduser);
router.get('/edit/:id', userControllers.editUser);
router.post('/update/:id', userControllers.updateuser);
router.get('/view/:id', userControllers.viewUser);
router.get('/delete/:id', userControllers.deleteUser);


module.exports = router;
