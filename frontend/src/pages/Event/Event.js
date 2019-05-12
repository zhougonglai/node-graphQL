import React, { Component } from 'react';
import classes from './event.module.scss';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AppContext from 'context/AppContext';
import { $fetch } from 'utils/fetch';

class Event extends Component {
  static contextType = AppContext;
  state = {
    open: false
  };

  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.price = React.createRef();
    this.description = React.createRef();
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  submitEvent = () => {
    const title = this.title.current.value;
    const price = this.price.current.value;
    const description = this.description.current.value;
    if (
      title.trim().length &&
      Number.isFinite(parseFloat(price)) &&
      price > 0 &&
      description.trim().length
    ) {
      const query = `
        mutation{
          createEvent(eventInput: {title: "${title}", price: ${price}, description: "${description}"}){
            _id
            title
            description
            price
            date
            creator{
              _id
              email
            }
          }
        }
      `;
      $fetch
        .post('http://localhost:3333/graphql', { query })
        .then(res => res.data)
        .then(({ createEvent }) => {
          if (createEvent) {
            this.context.setEvents(this.context.events.concat(createEvent));
            this.handleClose();
          } else {
            this.props.history.push('/auth');
          }
        });
    }
  };

  fetchEvents = () => {
    const query = `
      query{
        events{
            _id
            title
            description
            price
            date
            creator{
              _id
              email
            }
          }
        }
    `;
    $fetch
      .post('http://localhost:3333/graphql', { query })
      .then(res => res.data)
      .then(({ events }) => {
        this.context.setEvents(events);
      });
  };

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    const { open } = this.state;
    const { events } = this.context;
    return (
      <div className={classes.container}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <form className={classes.formContainer}>
              <TextField
                label="title"
                type="text"
                variant="outlined"
                margin="normal"
                inputRef={this.title}
              />
              <TextField
                label="price"
                type="number"
                variant="outlined"
                margin="normal"
                inputRef={this.price}
              />
              <TextField
                label="description"
                type="text"
                variant="outlined"
                margin="normal"
                inputRef={this.description}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" autoFocus onClick={this.submitEvent}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.toolbar}>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
          >
            New Event
          </Button>
        </div>
        <div className={classes.main}>
          {!!events.length && (
            <Grid container spacing={16}>
              {events.map((event, index) => (
                <Grid item key={event._id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader
                      title={event.title}
                      subheader={new Date(
                        parseInt(event.date)
                      ).toLocaleTimeString()}
                    />
                    <CardContent>
                      <Typography>{event.description}</Typography>
                    </CardContent>
                    <CardActions classes={{ root: classes.actionRoot }}>
                      <Typography>"$" {event.price}</Typography>
                      <Button>Details</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Event);
