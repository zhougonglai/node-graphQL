const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds =>
  await Event.find({ _id: { $in: eventIds}})

const user = async userId =>
  await User.findById(userId)

const event = async eventId =>
  await Event.findById(eventId)
