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
import { $fetch } from '../../utils/fetch';

export default class Auth extends Component {
  static contextType = AppContext;
  state = {
    showPW: false
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  toggler = () => {
    this.setState({ showPW: !this.state.showPW });
  };

  submit = () => {
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length && password.trim().length) {
      console.log(email, password);
      $fetch
        .post('/graphql', {
          query: `
          mutation {
            createUser(userInput: {email: "${email.trim()}", password: "${password.trim()}"}){
              _id
              email
            }
          }
        `
        })
        .then(data => {
          console.log(data);
        });
    } else {
      this.context.setSnackbar({
        ...this.context.snackbar,
        message: 'wrong!!!',
        open: true
      });
    }
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
            inputRef={this.emailEl}
          />
          <TextField
            label="Password"
            className={classes.textField}
            type={this.state.showPW ? 'text' : 'password'}
            variant="outlined"
            autoComplete="current-password"
            margin="normal"
            inputRef={this.passwordEl}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.toggler}
                  >
                    {this.state.showPW ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <div className={classes.formAction}>
            <Button className={classes.submit} onClick={this.submit}>
              登录
            </Button>
          </div>
        </form>
        <div className={classes.formHelp}>
          <Button className={classes.signUp}>来注册一个吧?</Button>
        </div>
      </Paper>
    );
  }
}
