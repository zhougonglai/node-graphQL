const EventResolver = require('./events');
const BookingResolver = require('./booking');
const UserResolver = require('./user');

module.exports = {
  ...EventResolver,
  ...BookingResolver,
  ...UserResolver
}
