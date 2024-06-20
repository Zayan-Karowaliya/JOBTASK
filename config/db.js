import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;