const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" Обязательно должно быть заполнено'],
    minlength: [2, 'Минимальная кол-во символов "name" - 2'],
    maxlength: [30, 'Максимальная кол-во символов "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" Обязательно должно быть заполнено'],
    validate: {
      validator(avatar) {
        return validator.isURL(avatar, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" Обязательно должно быть заполнено'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
