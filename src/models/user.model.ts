import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
}

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes, Omit<UserAttributes,'id'>> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
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
      firstName: {
        type: new DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: new DataTypes.STRING(50),
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
