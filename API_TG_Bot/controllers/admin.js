const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const BadRequestErr = require('../errors/BadRequestErr');
const ConflictErr = require('../errors/ConflictErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const createAdmin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => Admin.create({ ...req.body, password: hash }))
        .then((admin) => {
            const {
                name, _id,
            } = admin;
            res.send({
                name, _id,
            });
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                next(new BadRequestErr('Ошибка валидации'));
                return;
            }
            if (err.code === 11000) {
                next(new ConflictErr('Пользователь с таким именем уже существует'));
                return;
            }
            next(err);
        });
};

const login = (req, res, next) => {
    const { name, password } = req.body;
    return Admin.findAdminByCredentials(name, password)
        .then((admin) => {
            const token = jwt.sign({ _id: admin._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            res.send({token});
        })
        .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Куки авторизации удалены' });
};


module.exports = {
    createAdmin,
    login,
    logout,
};
