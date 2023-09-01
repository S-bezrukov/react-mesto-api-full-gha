const mongoose = require('mongoose');
const { ValidationError } = require('mongoose').Error;
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const {
  CREATE_STATUS,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .populate({
      path: 'owner',
      select: '-name -about -avatar -email -password', // Исключить поле name из owner
    })
    .populate({
      path: 'likes',
      select: '-name -about -avatar -email -password', // Исключить поле name из likes
    })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => Card.populate(card, [
      {
        path: 'owner',
        select: '-name -about -avatar -email -password',
      },
      {
        path: 'likes',
        select: '-name -about -avatar -email -password',
      },
    ]))
    .then((card) => res.status(CREATE_STATUS).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.isValidObjectId(cardId)) {
    return next(new BadRequestError('Некорректный ID карточки'));
  }
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (req.user._id === card.owner.toString()) {
        return Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ message: 'Карточка удалена' }));
      } else {
        return next(new ForbiddenError('Нельзя удалять не ваши карточкии'));
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(cardId)) {
    return next(new BadRequestError('Некорректный ID карточки'));
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate({
      path: 'owner',
      select: '-name -about -avatar -email -password', // Исключить поле name из owner
    })
    .populate({
      path: 'likes',
      select: '-name -about -avatar -email -password', // Исключить поле name из likes
    })
    .select('-about -avatar')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(cardId)) {
    return next(new BadRequestError('Некорректный ID карточки'));
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate({
      path: 'owner',
      select: '-name -about -avatar -email -password', // Исключить поле name из owner
    })
    .populate({
      path: 'likes',
      select: '-name -about -avatar -email -password', // Исключить поле name из likes
    })
    .select('-about -avatar')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
