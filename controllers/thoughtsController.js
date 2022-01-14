const { User, Thoughts } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought exists with this ID" })
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    createThought(req, res) {
        Thoughts.create({ body: req.body })
        .then((dbThoughtData) => {
            return User.findByIdAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user exists with this ID" });
                return;
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thoughts.findByIdAndUpdate({_id: req.params.id }, body, {new: true } )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought exists with this ID" });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
        Thoughts.findByIdAndDelete({ _id: req.params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought exists with this ID" });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    addReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought exists with this ID" });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    removeReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    }
};

module.exports = thoughtController;