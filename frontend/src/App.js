import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, Snackbar } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import DefaultLayout from './layout/Default';
import UserLayout from './layout/User';
import AuthPage from './pages/Auth';
import BookingPage from './pages/Booking';
import EventPage from './pages/Event';
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

const Layout = props =>
  useContext(AppContext).layout === 'default' ? (
    <DefaultLayout collapse={props.collapse} setCollapse={props.setCollapse}>
      {props.children}
    </DefaultLayout>
  ) : (
    <UserLayout>{props.children}</UserLayout>
  );

function App() {
  const [collapse, setCollapse] = useState(true);
  const [layout, setLayout] = useState('user');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center'
  });
  const [user, setUser] = useState({ token: null, userId: null });
  const login = (token, userId, tokenExpiration) => setUser({ token, userId });
  const logout = () => setUser({ token: null, userId: null });

  useEffect(() => {
    console.log('token:', user.token);
  }, [user.token]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            collapse,
            layout,
            setLayout,
            snackbar,
            setSnackbar,
            user: {},
            bookings: [],
            events: [],
            token: user.token,
            userId: user.userId,
            login,
            logout
          }}
        >
          <Layout collapse={collapse} setCollapse={setCollapse}>
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
              {!user.token && <Route path="/auth" component={AuthPage} />}
              <Route path="/events" component={EventPage} />
              {user.token && <Route path="/bookings" component={BookingPage} />}

              {user.token && <Redirect from="/" to="/events" exact />}
              {user.token && <Redirect from="/auth" to="/events" exact />}
              {!user.token && <Redirect from="/" to="/auth" />}
            </Switch>
          </Layout>
        </AppContext.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
