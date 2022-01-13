const { User, Thoughts } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
        .then((dbThoughtData) => res.josn(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },
    // Get single thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID '})
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => res.status(500).json(err));
    },
    // Create thought
    createThought(req, res) {
        Thoughts.create(req.body)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },
    // Update thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' })
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
    // Delete thought
    deleteThought(req, res) {
        Thoughts.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' })
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
    // Add reaction
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' })
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
    // Remove reaction
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.thoughtId } } }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' })
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
};