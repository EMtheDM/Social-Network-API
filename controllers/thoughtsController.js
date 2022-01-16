const { Thoughts, User } = require('../models');

const thoughtController = {
    // GET ALL thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
          .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // GET SINGLE thought
    getSingleThought({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this ID" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // CREATE thought
    createThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user with this ID" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // Update thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No thought with this ID" });
                return;
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // DELETE thought
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this ID" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(500).json(err));
    },
    // ADD reaction
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this ID" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
    // DELETE reaction
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;