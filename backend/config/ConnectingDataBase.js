const mongoose = require('mongoose');

module.exports = () => {
  const DB1 = mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  DB1.once('open', () => console.log("DataBase DB1 is Connected..."));
  DB1.on('error', err => console.log("DataBase DB1 Error: " + err.message));

  const DB2 = mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  DB2.once('open', () => console.log("DataBase DB2 is Connected..."));
  DB2.on('error', err => console.log("DataBase DB2 Error: " + err.message));

  const DB3 = mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  DB3.once('open', () => console.log("DataBase DB3 is connected..."));
  DB3.on('error', err => console.log("DB3 Error: " + err.message));

  const DB4 = mongoose.createConnection(process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  DB4.once('open', () => console.log("DataBase DB4 is Connected..."));
  DB4.on('error', err => console.log("DataBase DB4 Error:" + err.message));
  return { DB1, DB2, DB3, DB4 };
};
