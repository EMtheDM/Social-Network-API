const { User } = require('../models');
const { populate } = require('../models/User');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    // Get User by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Create user
    createUser({ body }, res) {
        User.create(body)
        .then((dbUserData) => {
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    // Update user
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },

    // Delete user
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Add friend
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendsId } },
            { new: true }
        )
        .then((dbUserData) => {
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Remove friend
    removeFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        });
    }
};

module.exports = userController;