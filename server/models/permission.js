module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define("permissions", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return Permission;
};