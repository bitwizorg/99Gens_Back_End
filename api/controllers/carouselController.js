const jwt = require('jsonwebtoken');

const { CarouselModel, CarouselModelMethods } = require('../models');

class CarouselController {
    constructor() {
        this.CarouselModel = CarouselModel;
    }

    save(req, res, next) {
        const postBody = {};
        postBody.userEmail = req.body.userEmail;
        postBody.carousel = JSON.stringify(req.body.carousels);
        postBody.thumbnail = req.body.thumbnail;
        postBody.carousel_uID = req.body.carousel_uID;

        return this.CarouselModel(postBody)
            .save()
            .then((carousel) => {
                return res.status(201).json({
                    status: "success",
                    MSG: "Successfully Created!!!",
                    carousel: carousel
                });
            }).catch((error) => {
                console.log(error);
            })
    }

    get_savedCarousel(req, res, next) {
        const postBody = {};
        postBody.userEmail = req.body.email;

        return this.CarouselModel.aggregate([
            { $match: { userEmail: postBody.userEmail } },
            {
                $group: {
                    _id: "$carousel_uID",
                    "records": {
                        $push: "$$ROOT"
                    },
                    "count": {
                        $sum: 1
                    }
                }
            },
            { $sort: { _id: 1 } }
        ]).then(response => res.json({
            data: {
                status: true,
                response_data: response
            }
        })).catch((err) => {
            next(err);
        });
    }

    generateUniqueID(req, res, next) {
        let text = '';
        let sequenceLength = 6;
        const possible = 'ABCDEFGHIJKLMNOPQbRSTUVWXYZ0123456789';
        const dateID = Date.now() * Math.random();
        let dateKey = dateID % 10 / 10;

        for (let i = 0; i < sequenceLength; i += 1) {
            text += possible.charAt(Math.floor((Math.random() + dateKey) / 2 * possible.length));
        }
        return res.status(201).json({
            status: "success",
            token: text
        });
    }
}

module.exports = new CarouselController();