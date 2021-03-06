//abhishek360

module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players',{
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picUrl: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    dept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    battingHand: {
      type: DataTypes.STRING,
    },
    bowlingHand: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    whatsApp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });

  Players.associate = function(models) {
    Players.belongsTo(models.Teams);
  }

  return Players;
};
