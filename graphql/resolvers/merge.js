/* eslint-disable no-return-await */
/* eslint-disable implicit-arrow-linebreak */
const Event = require('../../models/event');
const User = require('../../models/user');

exports.findEvents = async eventIds =>
  await Event.find({ _id: { $in: eventIds } })

exports.findUser = async userId =>
  await User.findById(userId)

exports.findEvent = async eventId =>
  await Event.findById(eventId)
