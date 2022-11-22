const { Model, DataTypes } = require('sequelize');
const { format } = require('date-fns');
const { USER_ROLES } = require('../constants');
const { db } = require('../config');
const { encryptHelpers } = require('../helpers');

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true, notEmpty: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM, defaultValue: USER_ROLES.CLIENT, values: Object.values(USER_ROLES) },
  },
  { sequelize: db, modelName: 'user' }
);

User.addHook('beforeCreate', async user => {
  // bcrypt does not support JavaScript async/await, so we resort to creating a promise
  const hashedPassword = await encryptHelpers.hashPassword(user);
  user.password = hashedPassword;

  if (!user?.username) user.username = `${user.name.toLowerCase()}${user.surname.toLowerCase()}${format(new Date(), 'yyyyMMddHHmm')}`;
});

module.exports = User;
