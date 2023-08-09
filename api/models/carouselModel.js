const mongoose = require('mongoose');
const { Schema } = mongoose;

const carouselSchema = new Schema(
    {
        carousel_uID: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true
        },
        carousel: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            expires: 43200
        }
    },
    { timestamps: {} },
);

carouselSchema.pre('save', function (next) {
    const carouselData = this;
    console.log("I am on it I am on it!!@#!@#!@#");
    return next();
});

carouselSchema.set('toObject', { virtuals: true });
carouselSchema.set('toJSON', { virtuals: true });

const modelObj = mongoose.model('Carousel', carouselSchema);
module.exports = modelObj;