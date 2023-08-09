const mongoose = require('mongoose');

const { Schema } = mongoose;

const modelSchema = new Schema(
  {
    title: {
      type: String,
    },
    subject: {
      type: String,
    },
    variables: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    isDeleted: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  {
    timestamps: {},
  },
);

const modelObj = mongoose.model('Template', modelSchema);
module.exports = modelObj;
