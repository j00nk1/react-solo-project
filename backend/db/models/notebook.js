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
    Notebook.hasMany(models.Note, {
      foreignKey: "notebookId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  Notebook.generateMain = async function (username, userId) {
    const newNotebook = await Notebook.create({
      userId,
      title: `${username}'s Notebook`,
      isMain: true,
    });

    return await Notebook.findByPk(newNotebook.id);
  };

  Notebook.addNotebook = async function ({ userId, title }) {
    const newNotebook = await Notebook.create({
      userId,
      title,
      isMain: false,
    });

    return await Notebook.findByPk(newNotebook.id);
  };

  return Notebook;
};
