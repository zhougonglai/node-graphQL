import React, { Component } from 'react';
import {
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import classes from './auth.module.scss';
import AppContext from 'context/AppContext';
import { $fetch } from 'utils/fetch';

class Auth extends Component {
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

  submit = sign => {
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length && password.trim().length) {
      const createUser = `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}){
              _id
              email
            }
          }
        `;
      const login = `
          query {
            login(email: "${email}", password: "${password}"){
              userId
              token
              tokenExpiration
            }
          }
      `;
      $fetch
        .post('http://localhost:3333/graphql', {
          query: sign ? createUser : login
        })
        .then(res => res.data)
        .then(({ login: { token, userId } }) => {
          this.context.login(token, userId);
          Cookies.set('token', token, { expires: 1 / 24 });
          this.props.history.push('/events');
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
            <Button className={classes.submit} onClick={() => this.submit()}>
              登录
            </Button>
            <Button
              className={classes.signUp}
              onClick={() => this.submit(true)}
            >
              注册
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withRouter(Auth);
