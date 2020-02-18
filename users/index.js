const express = require('express');
const user = require('./userController');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/:id', validate.userExists, user.getUser);
router.post('/', user.addUser);
router.patch('/:id', validate.userExists, user.updateUser);
router.get('/:id/logout', user.logoutUser);

module.exports = router;
