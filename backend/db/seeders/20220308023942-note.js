"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Notes",
      [
        {
          userId: 1,
          notebookId: 1,
          title: "First Note",
          content: "This is the first note",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          notebookId: 2,
          title: "iste",
          content: "Adipisci quae eligendi rem aliquid qui eos.",
          createdAt: "2021-07-15T17:37:10.090Z",
          updatedAt: "2021-07-03T03:29:38.729Z",
        },
        {
          userId: 3,
          notebookId: 3,
          title: "quia",
          content: "Quam qui reprehenderit et tempora distinctio.",
          createdAt: "2022-02-10T23:34:39.563Z",
          updatedAt: "2022-01-02T21:18:59.031Z",
        },
        {
          userId: 1,
          notebookId: 1,
          title: "nobis",
          content: "Hic qui et temporibus rem non.",
          createdAt: "2021-03-06T06:06:02.290Z",
          updatedAt: "2021-07-02T00:46:33.021Z",
        },
        {
          userId: 1,
          notebookId: 1,
          title: "deleniti",
          content: "In rerum beatae sequi eligendi.",
          createdAt: "2021-12-17T17:18:58.234Z",
          updatedAt: "2021-02-23T00:32:02.568Z",
        },
        {
          userId: 1,
          notebookId: 1,
          title: "repudiandae",
          content:
            "Sit et rerum provident labore corrupti magnam ratione tempore nulla.",
          createdAt: "2021-10-30T13:56:10.942Z",
          updatedAt: "2021-12-18T14:52:59.595Z",
        },
        {
          userId: 3,
          notebookId: 3,
          title: "natus",
          content: "Cupiditate blanditiis maiores.",
          createdAt: "2022-01-13T10:41:55.079Z",
          updatedAt: "2021-12-20T09:02:19.329Z",
        },
        {
          userId: 1,
          notebookId: 1,
          title: "aut",
          content: "Est repudiandae nostrum voluptatem recusandae sapiente.",
          createdAt: "2021-03-19T21:08:20.724Z",
          updatedAt: "2021-10-28T23:47:54.668Z",
        },
        {
          userId: 1,
          notebookId: 1,
          title: "nulla",
          content:
            "Perferendis quibusdam pariatur culpa laboriosam voluptas et deleniti deleniti dolores.",
          createdAt: "2021-12-13T05:38:24.349Z",
          updatedAt: "2021-12-18T12:37:32.739Z",
        },
        {
          userId: 2,
          notebookId: 2,
          title: "veniam",
          content: "Iusto sapiente nihil perspiciatis laudantium.",
          createdAt: "2021-06-20T07:58:53.925Z",
          updatedAt: "2021-09-17T12:57:18.385Z",
        },
        {
          userId: 1,
          notebookId: 1,
          title: "deleniti",
          content: "Et sint accusantium non molestiae id culpa maxime.",
          createdAt: "2022-02-05T10:59:28.647Z",
          updatedAt: "2021-05-24T13:21:45.589Z",
        },
        {
          userId: 1,
          notebookId: 1,
          title: "perspiciatis",
          content: "Blanditiis maxime voluptas.",
          createdAt: "2021-10-24T08:46:45.863Z",
          updatedAt: "2021-04-07T17:06:42.209Z",
        },
        {
          userId: 2,
          notebookId: 2,
          title: "ipsam",
          content:
            "Velit facere quia natus voluptatem maxime voluptatem ducimus modi consequatur.",
          createdAt: "2021-12-07T18:43:01.281Z",
          updatedAt: "2021-03-25T19:33:53.318Z",
        },
        {
          userId: 2,
          notebookId: 2,
          title: "autem",
          content: "Dignissimos velit rem doloribus sunt est odit quis autem.",
          createdAt: "2022-01-20T03:34:27.704Z",
          updatedAt: "2022-01-10T00:52:24.767Z",
        },
        {
          userId: 2,
          notebookId: 2,
          title: "nihil",
          content: "Et ipsam nulla eos molestiae nihil et totam.",
          createdAt: "2021-10-16T05:02:12.713Z",
          updatedAt: "2021-11-15T11:22:39.055Z",
        },
        {
          userId: 2,
          notebookId: 2,
          title: "sint",
          content: "Impedit numquam maxime ea reiciendis sed provident.",
          createdAt: "2021-06-12T02:03:28.230Z",
          updatedAt: "2021-10-11T14:39:09.050Z",
        },
        {
          userId: 3,
          notebookId: 3,
          title: "nobis",
          content: "Aut neque rerum aperiam eligendi ipsa aut.",
          createdAt: "2021-02-19T18:16:21.067Z",
          updatedAt: "2021-05-31T04:06:13.295Z",
        },
        {
          userId: 3,
          notebookId: 3,
          title: "voluptas",
          content: "Veniam quia error sed ullam non laborum.",
          createdAt: "2021-05-19T07:11:40.137Z",
          updatedAt: "2021-08-29T17:22:31.252Z",
        },
        {
          userId: 2,
          notebookId: 2,
          title: "inventore",
          content: "Qui et et temporibus.",
          createdAt: "2022-01-29T16:56:01.391Z",
          updatedAt: "2021-11-01T15:17:13.946Z",
        },
        {
          userId: 2,
          notebookId: 2,
          title: "aut",
          content: "Exercitationem dolores reiciendis.",
          createdAt: "2021-07-10T11:40:00.213Z",
          updatedAt: "2021-12-31T07:52:29.680Z",
        },
        {
          userId: 3,
          notebookId: 3,
          title: "autem",
          content: "Laboriosam est iure natus est voluptatem.",
          createdAt: "2021-11-15T08:03:55.730Z",
          updatedAt: "2021-04-05T06:59:22.298Z",
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
    return queryInterface.bulkDelete("Notes", null, {});
  },
};
