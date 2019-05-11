import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, Snackbar } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Cookies from 'js-cookie';
import DefaultLayout from './layout/Default';
import UserLayout from './layout/User';
import AppContext from './context/AppContext';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  const [collapse, setCollapse] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center'
  });
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({
    token: Cookies.get('token'),
    userId: null
  });
  const login = (token, userId, tokenExpiration) => setUser({ token, userId });
  const logout = () => setUser({ token: null, userId: null });

  useEffect(() => {
    console.log(user.token);
  }, [user]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            collapse,
            setCollapse,
            snackbar,
            setSnackbar,
            user,
            bookings,
            setBookings,
            events,
            setEvents,
            login,
            logout
          }}
        >
          <Snackbar
            anchorOrigin={{
              vertical: snackbar.vertical,
              horizontal: snackbar.horizontal
            }}
            open={snackbar.open}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{snackbar.message}</span>}
          />
          <Switch>
            <Route path="/auth" component={UserLayout} />
            <Route path="/" component={DefaultLayout} />
          </Switch>
        </AppContext.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
