import { DataTypes, Model, Sequelize } from "sequelize";
import { UserAttributes } from "../utils/interfaces.utils";



export default (sequelize: Sequelize) => {
  class User
    extends Model<UserAttributes, Omit<UserAttributes, "id">>
    implements UserAttributes
  {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    // readonly properties
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: new DataTypes.STRING(16),
        allowNull: false,
      },
      last_name: {
        type: new DataTypes.STRING(16),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(320),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(61),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      sequelize,
    }
  );

  return User;
};
