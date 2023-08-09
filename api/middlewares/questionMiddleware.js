const { QuestionModel, VoteModel } = require('../models');
const { CommonService } = require('../services');

module.exports = {
  checkSlug: (req, res, next) => {
    const slug = CommonService.stringToSlug(req.body.name);
    QuestionModel.findOne({ slug, isDeleted: false }, { _id: 1, slug: 1 })
      .then((resData) => {
        if (!resData) {
          req.body.slug = slug;
          return next();
        }
        return next(new Error('Duplicate Question, Already exist in system.'));
      })
      .catch(err => next(err));
  },
  checkQuestion: (req, res, next) => {
    QuestionModel.findOne({ slug: req.params.qId, isDeleted: false }, { tags: 1, _id: 1 })
      .then((resData) => {
        if (resData) {
          req.tags = resData.tags;
          req.questionId = resData._id;
          return next();
        }
        return next(new Error('Question not found'));
      })
      .catch(err => next(err));
  },
  checkQuestionById: (req, res, next) => {
    QuestionModel.findOne({ _id: req.params.qId, isDeleted: false }, { tags: 1, _id: 1 })
      .then((resData) => {
        if (resData) {
          req.tags = resData.tags;
          req.questionId = resData._id;
          return next();
        }
        return next(new Error('Question not found'));
      })
      .catch(err => next(err));
  },
  generateUuid(req, res, next) {
    const uuid = CommonService.incrSlug;
    return QuestionModel.findOne({ isDeleted: false }).sort({ createdAt: -1 })
      .then((resData) => {
        if (resData) {
          req.uuid = resData.uuid;
          return next();
        }
        req.uuid = uuid;
        return next();
      })
      .catch(err => next(err));
  },
  checkVote: (req, res, next) => {
    VoteModel.findOne(
      { uId: req.user._id, qId: req.params.qId, bonusType: req.body.bonusType },
      { voteType: 1 },
    )
      .then((resData) => {
        if (resData) {
          req.voteType = resData.voteType;
          next();
        } else {
          req.voteType = 0;
          next();
        }
      })
      .catch(err => next(err));
  },
  checkVoteAnswer: (req, res, next) => {
    VoteModel.findOne(
      { uId: req.user._id, aId: req.params.aId, bonusType: req.body.bonusType },
      { voteType: 1 },
    )
      .then((resData) => {
        if (resData) {
          req.voteType = resData.voteType;
          next();
        } else {
          req.voteType = 0;
          next();
        }
      })
      .catch(err => next(err));
  },
};
