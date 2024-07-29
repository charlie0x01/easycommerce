import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import env from "../utils/env";

export const connect = (): Sequelize => {
  try {
    const _connection = new Sequelize(env.database, env.user, env.password, {
      host: env.host,
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
