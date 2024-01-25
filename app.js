require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { signInValidation, signUpValidation } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { DB_ADRESS } = require('./config');

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());

app.use(cors);
mongoose.connect(DB_ADRESS);

app.use(requestLogger);
app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
