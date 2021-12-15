import { Sequelize, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://tquubuspdzcqab:591023ee8aa83288453f0c597675711ce9d29cfc02be1e4d49d6fd01a0d1d1b8@ec2-3-208-157-78.compute-1.amazonaws.com:5432/db08qao02cbtei",
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: string) => {
    console.error("Unable to connect to the database:", err);
  });

const Todos = sequelize.define(
  "todos",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    finished: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: false,
  }
);

Todos.sync({ alter: true });

export default Todos;
