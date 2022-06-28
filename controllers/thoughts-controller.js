const Thoughts = require('../models');

const thoughtsController = {

  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({_id: -1})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },

  getThoughtsByID({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({_id: -1})
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ 
            message: 'No thought found with this ID' 
          });
          return;
        } 
        res.json(dbThoughtData);
      })
      .catch(err => res.sendStatus(400).json(err));
  },

  addThoughts({ body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id },
          { $push: { reactions: _id } }, 
          { new: true, runValidators: true } 
          );
      })
      .catch(err => res.json(err));
  },

  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ 
            message: 'No thought found with this ID' 
          });
          return;
        }
        res.json(dbThoughtData);
      })
  },

  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  addReactions({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsID }, 
      { $push: { reactions: body } }, 
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ 
            message: 'No thought found with this ID' 
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  deleteReactions({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsID }, 
      { $pull: { reactions: params.reactionsID } }, 
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ 
            message: 'No thought found with this ID' 
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.send(400).json(err));
  }
};

module.exports = thoughtsController;