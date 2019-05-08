import path from "path";
import Sequelize from "sequelize";
import autoload from "auto-load";
import config from "../config/app.config";
const configDatabase = config.configDatabase;
const db = {};

let sequelize = new Sequelize(
  configDatabase.database,
  configDatabase.username,
  configDatabase.password,
  configDatabase
);

Object.keys(autoload(__dirname))
  .filter(file => {
    return file !== "index";
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
