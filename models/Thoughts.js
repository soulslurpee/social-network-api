const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },

    username: {
      type: String,
      required: true
    },
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtsSchema.virtual('reactionsCount').get(function() {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;

