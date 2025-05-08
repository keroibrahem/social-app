// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;



const express = require('express');
const { registerUser, loginUser,getAllUsers ,getUsersById,updateUser,logoutUser } = require('../controllers/authController');

const router = express.Router();


router.put('/users/edit/:id', updateUser);

router.get('/users', getAllUsers);
router.get('/users/:id', getUsersById);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.put("/logout/:id", logoutUser);


module.exports = router;

