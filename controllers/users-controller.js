const { User, Users } = require('../models');

const usersController = {
  getAllUsers(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.json(err));
  },

  getUsersById(req, res) {
    Users.findOne({ _id: req.params.id })
      .then(user => res.json(user))
      .catch(err => res.json(err));
  },

  createUsers(req, res) {
    Users.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.json(err));
  },

  updateUsers(req, res) {
    Users.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then(user => res.json(user))
      .catch(err => res.json(err));
  },

  deleteUsers(req, res) {
    Users.findOneAndDelete({ _id: req.params.id })
      .then(user => res.json(user))
      .catch(err => res.json(err));
  },

};

module.exports = usersController;