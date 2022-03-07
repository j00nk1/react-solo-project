"use strict";

module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define(
    "Notebook",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {}
  );

  Notebook.associate = function (models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: "userId" });
  };

  Notebook.generateMain = async function (username, userId) {
    const newNotebook = await Notebook.create({
      userId,
      title: `${username}'s Notebook`,
      isMain: true,
    });

    return await Notebook.findByPk(newNotebook.id);
  };

  Notebook.addNotebook = async function (userId, title, isMain = false) {
    const newNotebook = await Notebook.create({
      userId,
      title,
      isMain,
    });

    return await Notebook.findByPk(newNotebook.id);
  };

  return Notebook;
};
