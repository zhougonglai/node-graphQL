const Event = require('../../models/event');

module.exports = {
    events: async () => await Event.find(),
    createEvent: async ({ eventInput }) => {
      const event = new Event(eventInput)
      return await event.save()
    }
}
