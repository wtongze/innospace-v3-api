import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

export class Position extends Model {
  public id!: number;
  public title!: string;
  public type!: string;
  public description!: string;
  public requirement!: string;
  public preference!: string;
  public skills!: string[];
  public project!: string;
  public views!: number;
  public visible!: boolean;
}

Position.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.NUMBER,
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
