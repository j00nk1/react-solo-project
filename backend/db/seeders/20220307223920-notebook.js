"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Notebooks",
      [
        {
          userId: 1,
          title: "Demo-User's Notebook",
          isMain: true,
        },
        {
          userId: 2,
          title: "FakeUser1's Notebook",
          isMain: true,
        },
        {
          userId: 3,
          title: "FakeUser2's Notebook",
          isMain: true,
        },
        {
          userId: 1,
          title: "Extra Notebook",
          isMain: false,
        },
        {
          userId: 1,
          title: "DELETE ME",
          isMain: false,
        },
        {
          userId: 2,
          title: "Custom",
          isMain: false,
        },
        {
          userId: 2,
          title: "You can delete",
          isMain: false,
        },
        {
          userId: 3,
          title: "Test notebook",
          isMain: false,
        },
        {
          userId: 1,
          title: "Delete Me 2",
          isMain: false,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Notebooks", null, {});
  },
};
