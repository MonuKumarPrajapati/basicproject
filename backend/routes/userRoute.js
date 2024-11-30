const express = require('express');
const router = express.Router();
const {getUser, createUser, getSingleUser,deleteUser,updateUser} = require('../controllers/userControllers.js')


//get the all users
router.get('/users', getUser);
// get single user
router.get('/users/:id', getSingleUser)
// create a user
router.post('/users', createUser);
//delete user
router.delete('/users/:id', deleteUser)
//updated user
router.patch('/users/:id',updateUser)



// router.put('/:id', updateUserController);
// router.put('/:id', deleteUserController);

// router.post('/', (req, res) => {
//     res.send('user getted successfully')
// })

const userRouter = router;

module.exports = userRouter;