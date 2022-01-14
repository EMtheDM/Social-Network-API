const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');

// GET and POST routes
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// GET Single, PUT and DELETE routes
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// POST and DELETE reaction routes
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;