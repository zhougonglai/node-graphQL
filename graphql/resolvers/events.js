/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
const Event = require('../../models/event');
const { findUser } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      const result = events.map(event => ({
        ...event._doc, creator: findUser(event.creator),
      }));
      return result
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const event = new Event({ ...eventInput, creator: req.userId })
    try {
      const result = await event.save();
      const createdEvent = { ...event._doc, creator: await findUser(result.creator) };
      const creator = await findUser(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
}
