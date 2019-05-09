const Event = require('../../models/event');

module.exports = {
  events: async () => await Event.find(),
  createEvent: async ({ eventInput }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const event = new Event({...eventInput, creator: req.userId})
    return await event.save()
  }
}
