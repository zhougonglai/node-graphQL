import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './user.module.scss';
import { routerConfig } from '../../routerConfig';

export default class User extends Component {
  render() {
    return (
      <div className={classes.container}>
        {routerConfig.map(({ path, component }, index) => (
          <Route path={path} component={component} key={index} />
        ))}
      </div>
    );
  }
}
