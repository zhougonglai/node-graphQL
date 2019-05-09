const Booking = require('../../models/booking');

module.exports = {
  bookings: async () => await Booking.find(),
  bookingEvent: async ({ eventId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const fetchEvent = await Event.findOne({ _id: eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchEvent._id
    });
    return await booking.save();
  },
  cancelBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const booking = await Booking.findById(bookingId).populate('event');
    await Booking.deleteOne({ _id: bookingId });
    return booking.event;
  }
}
