const { Sequelize } = require('sequelize');
const Station = require('./station');
const Train = require('./train');
const Comp = require('./comp');
const Seat = require('./seat');
const DictionaryData = require('./dictionaryData');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Station = Station;
db.Train = Train;
db.Comp = Comp;
db.Seat = Seat;
db.DictionaryData = DictionaryData;

Station.init(sequelize);
Train.init(sequelize);
Comp.init(sequelize);
Seat.init(sequelize);
DictionaryData.init(sequelize);

Station.associate(db);
Train.associate(db);
Comp.associate(db);
Seat.associate(db);
DictionaryData.associate(db);

module.exports = db;
