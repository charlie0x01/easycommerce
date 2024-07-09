import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

// database connection details
const database: string = process.env.DATABASE || "";
const username: string = process.env.USER || "";
const password: string = process.env.PASSWORD || "";
const host: string | undefined = process.env.HOST;

export const connect = (): Sequelize => {
  try {
    const _connection = new Sequelize(database, username, password, {
      host: host,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    // check database connection
    _connection.authenticate().then(() => {
      console.log("✅ Database Connected!!");
    });

    return _connection;
  } catch (error) {
    console.log("❌ ", error);
    return new Sequelize();
  }
};
