import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

export class User extends Model {
  public uid!: string;
  public name!: string;
  public description!: string | null;
  public resume!: string | null;
  public email!: string;
  public mobile_phone_number!: string | null;
  public skills!: string[];
  public interested_tags!: string[];
  public interested_fields!: string[];
  public visible!: boolean;
}

User.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    resume: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_phone_number: DataTypes.STRING,
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    interested_tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    interested_fields: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
  }
);
