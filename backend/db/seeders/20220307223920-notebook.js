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
