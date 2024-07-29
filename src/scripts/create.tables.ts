import { connect } from "../config/database.config";
import User from "../models/user.model";

const createTables = async () => {
  try {
    const database = connect();
    await User(database)
      .sync({ force: true })
      .then(() => {
        console.log("\n==> Creating Tables");
        console.log("--> Users Table Created ✅");
      });

    database.close().then(() => {
      console.log("✅ Database Disconnected");
    });
  } catch (error) {
    console.error("❌ ", error);
  }
};

createTables();
