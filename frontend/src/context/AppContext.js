import React from 'react';

export default React.createContext({
  collapse: true,
  user: {},
  bookings: [],
  events: [],
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  layout: 'default',
  setLayout: () => {},
  snackbar: {},
  setSnackbar: () => {}
});
