const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

const adminSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: true,
            select: false,
        },
        name: {
            type: String,
            minlength: 2,
            maxlength: 30,
            required: true,
            unique: true,
        },
    },
    {
        versionKey: false,
    },
);

adminSchema.statics.findAdminByCredentials = function (name, password) {
    return this.findOne({ name }).select('+password')
        .then((admin) => {
            if (!admin) {
                return Promise.reject(new UnauthorizedErr('Неправильные имя или пароль'));
            }
            return bcrypt.compare(password, admin.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new UnauthorizedErr('Неправильные имя или пароль'));
                    }
                    return admin;
                });
        });
};

module.exports = mongoose.model('admin', adminSchema);