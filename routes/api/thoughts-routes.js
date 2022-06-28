const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtsByID,
  addThoughts,
  updateThoughts,
  deleteThoughts,
  addReactions,
  deleteReactions
} = require('../../controllers/thoughts-controller');

router.route('/')
    .get(getAllThoughts);

router.route('/:userID')
    .post(addThoughts);

router.route('/:thoughtID')
    .get(getThoughtsByID)
    .delete(deleteThoughts)
    .put(updateThoughts);

router.route('/:thoughtID/reactions')
    .post(addReactions);

router.route('/:thoughtID/reactions/:reactionID')
    .delete(deleteReactions);

module.exports = router;