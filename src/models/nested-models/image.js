const { Model, DataTypes } = require('sequelize');
const { db } = require('../../config');

class Image extends Model {}

Image.init(
  {
    id: { type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, unique: true, primaryKey: true },
    url: { type: DataTypes.STRING, require: true },
  },
  { sequelize: db, modelName: 'image' }
);

module.exports = Image;
