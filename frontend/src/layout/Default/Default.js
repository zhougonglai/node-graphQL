import React, { Component } from 'react';
import { IconButton, AppBar, Toolbar, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, Route } from 'react-router-dom';

import classes from './default.module.scss';
import AppContext from '../../context/AppContext';
import { routerConfig } from '../../routerConfig';

export default class Default extends Component {
  static contextType = AppContext;
  render() {
    return (
      <React.Fragment>
        <AppBar
          position="sticky"
          className={this.props.collapse ? classes.openDrawer : ''}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            <Button color="inherit" component={Link} to="/events">
              Events
            </Button>
            <Button color="inherit" component={Link} to="/bookings">
              Bookings
            </Button>
            <Button color="inherit" component={Link} to="/auth">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main className={classes.container}>
          {routerConfig.map(({ path, component }, index) => (
            <Route path={path} component={component} key={index} />
          ))}
        </main>
      </React.Fragment>
    );
  }
}
