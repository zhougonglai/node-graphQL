import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
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
  return (
    <BrowserRouter>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            collapse,
            layout,
            setLayout,
            user: {},
            bookings: [],
            events: []
          }}
        >
          <Layout collapse={collapse} setCollapse={setCollapse}>
            <Switch>
              <Route path="/" component={AuthPage} exact />
              <Route path="/events" component={EventPage} />
              <Route path="/bookings" component={BookingPage} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </AppContext.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
