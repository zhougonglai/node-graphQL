import React, { Component } from 'react';
import {
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  Button,
  Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';

import classes from './default.module.scss';
import AppContext from '../context/AppContext';

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
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={() => this.props.setCollapse(!this.props.collapse)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={() => this.context.setLayout('user')}
            >
              Auth
            </Button>
            <Button color="inherit" component={Link} to="/events">
              Events
            </Button>
            <Button color="inherit" component={Link} to="/bookings">
              Bookings
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.props.collapse}
          variant="persistent"
          className={classes.drawer}
          classes={{
            paper: classes.drawer
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={() => this.props.setCollapse(!this.props.collapse)}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
        </Drawer>
        <main className={this.props.collapse ? classes.openDrawer : ''}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}
