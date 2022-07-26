import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

export class Application extends Model {
  public id!: number;
  public project!: string;
  public position!: number;
  public owner!: string;
  public name!: string;
  public email!: string;
  public mobile_phone_number!: string;
  public resume!: string;
  public type!: string;
  public status!: string;
  public accepted_at!: string | null;
  public rejected_at!: string | null;
  public reviewed_at!: string | null;
  public sent_at!: string | null;
  public withdrawed_at!: string | null;
}

Application.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accepted_at: DataTypes.STRING,
    rejected_at: DataTypes.STRING,
    reviewed_at: DataTypes.STRING,
    sent_at: DataTypes.STRING,
    withdrawed_at: DataTypes.STRING,
  },
  {
    sequelize,
    paranoid: true,
  }
);
