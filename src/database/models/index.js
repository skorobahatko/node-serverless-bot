'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const database = () => {
  let sequelize;
  try {
    if (config['development']) {
      sequelize = new Sequelize(process.env[config.development], config);
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        port: 5432,
        logging: console.log,
        maxConcurrentQueries: 100,
        dialect: 'postgres',
        pool: { maxConnections: 5, maxIdleTime: 30},
        language: 'en'
      });
    }

    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    
    return db;
  } catch (e) {
    console.log(`Sequelize error  ---   ${e}`)
  }
}

module.exports = {database};
