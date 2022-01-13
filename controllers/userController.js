const { User } = require('../models');
const { Thought } = require('../models/Thought');

module.exports = {
    // Get all users
    getAllUsers(req, res) {
        User.find()
        .then(async (dbUserData) => {
            const userObj = {
                dbUserData
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
            } else {
                res.json(dbUserData);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Create new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Update user
    updateUser(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.json(404).json({ message: 'No user found with this ID' })
            } else {
                res.json(dbUserData)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Delete user
    deleteUser(req, res) {
        User.findByIdAndRemove({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
            } else {
                Thought.findByIdAndUpdate(
                    { users: req.params.userId },
                    { $pull: { users: req.params.userId } },
                    { new: true }
                )
            }
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'User was deleted. User had no thoughts. How sad.' })
            } else {
                res.json({ message: 'User and assoicated thoughts were deleted' })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Add friend
    addFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
            } else {
                res.json(dbUserData)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Remove friend
    removeFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            {$pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
            } else {
                res.json(dbUserData)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};