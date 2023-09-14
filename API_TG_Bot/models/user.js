const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        if (validator.isEmail(value)) {
          return true;
        }
        return false;
      },
    },
    gender: {
      type: String,
      enum: ['м', 'ж'],
    },
    age: {
      type: Number,
    },
    city: {
      type: String,
    },
    firstName: {
      type: String,
    },
    eveningConversationTime: {
      hour: {
        type: Number,
        validate: {
          validator(v) {
            return v <= 23;
          },
          message: 'Введите значение от 0 до 23',
        },
      },
      minutes: {
        type: Number,
        validate: {
          validator(v) {
            return v <= 60;
          },
          message: 'Введите значение от 0 до 60',
        },
      }
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
