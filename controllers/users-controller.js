const { User, Users } = require('../models');

const usersController = {

  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({_id: -1})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  getUsersByID({ params }, res) {
    Users.findOne({ _id: params.id })
          .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({_id: -1})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this ID' 
          });
          return;
        } 
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  createUsers({ body }, res) {
    Users.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this ID' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  addFriend({ params, body }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: body.friendId } }, 
      { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this ID' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  removeFriend({ params, body }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: body.friendId } }, 
      { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ 
            message: 'No user found with this ID' 
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }

};

module.exports = usersController;