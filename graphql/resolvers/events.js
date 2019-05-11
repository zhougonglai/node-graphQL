/* eslint-disable no-return-await */
const Event = require('../../models/event');
const User = require('../../models/user');

module.exports = {
  events: async () => {
    const events = await Event.find();
    return events.map(event => ({
      ...event, creator: User.findById(event.creator),
    }))
  },
  createEvent: async ({ eventInput }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const event = new Event({ ...eventInput, creator: await User.findById(req.userId) })
    return await event.save()
  },
}
