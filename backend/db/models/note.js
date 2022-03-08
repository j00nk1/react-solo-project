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
        allowNull: false,
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

  Note.editNote = async function ({ noteId, title, content }) {
    const note = await Note.findByPk(noteId);
    note.update({ title, content });
    return await note;
  };

  Note.deleteNote = async function (noteId) {
    const note = await Note.findByPk(noteId);
    await note.destroy();
    return;
  };

  return Note;
};
