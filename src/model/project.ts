import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

export class Project extends Model {
  public id!: string;
  public name!: string;
  public logo!: string | null;
  public description!: string;
  public tags!: string[];
  public fields!: string[];
  public website!: string | null;
  public owner!: string;
  public contact_name!: string;
  public contact_email!: string;
  public views!: number;
  public visible!: boolean;
}

Project.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    fields: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    website: DataTypes.STRING,
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_email: {
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
