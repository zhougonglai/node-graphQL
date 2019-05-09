import React, { Component } from 'react';
import classes from './user.module.scss';

export default class User extends Component {
  render() {
    return <div className={classes.container}>{this.props.children}</div>;
  }
}
