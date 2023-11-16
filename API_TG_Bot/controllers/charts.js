const mongoose = require('mongoose');
const Chart = require('../models/chart');

const BadRequestErr = require('../errors/BadRequestErr');
const NotFoundErr = require('../errors/NotFoundErr');

const createChart = (req, res, next) => {
    Chart.create(req.body)
        .then(chart => res.send(chart))
        .catch(next);
}

const updateChart = (req, res, next) => {
    Chart.findByIdAndUpdate(req.params.chartId, req.body, { new: true }).orFail(new NotFoundErr('Запись с указанным _id не найдена'))
        .then((chart) => res.send(chart))
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                next(new BadRequestErr('Ошибка валидации'));
                return;
            }
            next(err);
        });
};

const getChartMe = (req, res, next) => {
    Chart.findById(req.params.chartId).orFail(new NotFoundErr('Запись с указанным _id не найдена'))
        .then(chart => res.send(chart))
        .catch(next);
};

module.exports = {
    createChart,
    updateChart,
    getChartMe
}