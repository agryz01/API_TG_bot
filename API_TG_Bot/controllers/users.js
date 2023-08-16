const mongoose = require('mongoose');
const User = require('../models/user');

const createUser = (req, res) => {
  const { email, firstName } = req.body;
  User.create({ email, firstName })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
//     .catch ((err) => {
//   if (err instanceof mongoose.Error.ValidationError) {
//     next(new BadRequestErr('Ошибка валидации'));
//     return;
//   }
//   if (err.code === 11000) {
//     next(new ConflictErr('Пользователь с таким email уже существует'));
//     return;
//   }
//   res.status(500).send({ message: 'Произошла ошибка' });
// });
}

module.exports = {
  createUser
}
