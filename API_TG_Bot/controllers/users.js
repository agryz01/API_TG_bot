const mongoose = require('mongoose');
const User = require('../models/user');

const BadRequestErr = require('../errors/BadRequestErr');
const ConflictErr = require('../errors/ConflictErr');
const NotFoundErr = require('../errors/NotFoundErr');

const createUser = (req, res, next) => {
  const { email, firstName } = req.body;
  User.create({ email, firstName })
    .then(user => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestErr('Ошибка валидации'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictErr('Пользователь с таким email уже существует'));
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true }).orFail(new NotFoundErr('Запись с указанным _id не найдена'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestErr('Ошибка валидации'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictErr('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

const getUserMe = (req, res, next) => {
  User.findById(req.params.userId).orFail(new NotFoundErr('Запись с указанным _id не найдена'))
    .then(user => res.send(user))
    .catch(next);
};

module.exports = {
  createUser,
  updateUser,
  getUserMe
}
