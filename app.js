const express = require('express');
const parser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const auth = require('./middleware/auth');

const app = express();

app.use(parser.json())
  .use(compression())
  .use(helmet())
  .use(auth)
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-y04ex.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
  .then(() => {
    app.listen(3333);
  }).catch((err) => {
    console.log(err)
  })
