const { User } = require('../models');
const { populate } = require('../models/User');

const userController = {
    // GET ALL users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => {
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // GET SINGLE user
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.id
        })
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
            res.status(500).json(err);
        });
    },
    // POST user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    // PUT user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // DELETE user
    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            } else {
                res.json(dbUserData)
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
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendsId } },
            { new: true }
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    // Remove friend
    removeFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendsId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
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

module.exports = userController;