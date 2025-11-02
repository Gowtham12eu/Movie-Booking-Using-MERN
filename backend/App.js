const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const createLoginModel = require('./Module/LoginModule');
const createSignModel = require('./Module/SignupModule');
const movieModule = require('./Module/MovieModule');
const bookModule = require('./Module/bookDataModule');
const createUserRouter = require('./Router/RouterLogin');
const connectDatabases = require('./config/ConnectingDataBase');
const movieRouter = require('./Router/MovieDataRouter');
const bookRouter = require('./Router/bookDataRouter');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();
app.use(express.json());
app.use(cors());

const { DB1, DB2, DB3, DB4 } = connectDatabases();

const LoginModel = createLoginModel(DB1);
const signModel = createSignModel(DB2);
const movie = movieModule(DB3);
const book = bookModule(DB4);
app.use('/api', createUserRouter(LoginModel, signModel));
app.use('/api/v1', movieRouter(movie));
app.use( bookRouter(book));
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
  return { DB1, DB2, DB3, DB4 };
});
