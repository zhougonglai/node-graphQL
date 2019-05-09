import React, { Component } from 'react';
import AppContext from '../../context/AppContext';
import {
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import classes from './auth.module.scss';

export default class Auth extends Component {
  static contextType = AppContext;
  state = {
    showPW: false
  };

  toggler = () => {
    this.setState({ showPW: !this.state.showPW });
  };

  render() {
    return (
      <Paper className={classes.container}>
        <form>
          <TextField
            label="Email"
            className={classes.textField}
            type="email"
            variant="outlined"
            autoComplete="email"
            margin="normal"
          />
          <TextField
            label="Password"
            className={classes.textField}
            type={this.state.showPW ? 'password' : 'text'}
            variant="outlined"
            autoComplete="current-password"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.toggler}
                  >
                    {this.state.showPW ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <div className={classes.formAction}>
            <Button className={classes.submit}>登录</Button>
          </div>
        </form>
        <div className={classes.formHelp}>
          <Button className={classes.signUp}>来注册一个吧?</Button>
        </div>
      </Paper>
    );
  }
}
