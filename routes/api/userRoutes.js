const router = require('express').Router();
const {
	getUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

//Getting single user is currently broken

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
