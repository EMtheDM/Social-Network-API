const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// GET route
router
    .route('/')
    .get(getAllThoughts);
// POST route
router
    .route('/:userId')
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
    .delete(deleteReaction);

module.exports = router;