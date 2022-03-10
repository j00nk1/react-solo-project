"use strict";

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notebookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  );

  Note.associate = function (models) {
    Note.belongsTo(models.User, { foreignKey: "userId" });
    Note.belongsTo(models.Notebook, { foreignKey: "notebookId" });
  };

  Note.addNote = async function ({ userId, notebookId, title, content }) {
    const newNote = await Note.create({
      userId,
      notebookId,
      title,
      content,
    });
    return await Note.findByPk(newNote.id);
  };

  Note.editNote = async function ({ note, title, content, notebookId }) {
    note.update({ title, content, notebookId });
    return await note;
  };

  return Note;
};
