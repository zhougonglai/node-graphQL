const Booking = require('../../models/booking');

module.exports = {
  bookings: async () => await Booking.find(),
  bookingEvent: async ({ eventId, userId }) => {
    const fetchEvent = await Event.findOne({ _id: eventId });
    const booking = new Booking({
      user: userId,
      event: fetchEvent
    });
    return await booking.save();
  },
}
