const asyncHandler = require("express-async-handler");
const express = require("express");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note } = require("../../db/models");

const router = express.Router();
// ------------------- Validations ------------------------
// Signup validation
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Note Validation
const validateNote = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your note's title")
    .isLength({ max: 30 })
    .withMessage("Title must be shorter than 30 characters"),
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your note's content"),
];

const validateNotebook = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your note's title")
    .isLength({ max: 20 })
    .withMessage("Title must be shorter than 20 characters"),
];

// --------- Route Handlers /api/users/ ------------------
// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    const { id } = await user;

    const newNotebook = await Notebook.generateMain(username, id);

    return res.json({
      user,
      newNotebook,
    });
  })
);

// ------------- NOTEBOOKS routes /api/users/:userId/notebooks ------------------
// READ Notebooks
router.get(
  "/:userId(\\d+)/notebooks/",
  asyncHandler(async (req, res) => {
    const { userId } = await req.params;

    const notebookList = await Notebook.findAll({
      where: { userId },
    });

    return res.json(notebookList);
  })
);

// Create a notebook
router.post(
  "/:userId/notebooks/",
  validateNotebook,
  asyncHandler(async (req, res, next) => {
    const { userId } = await req.params;
    const notebook = await User.findOne({
      where: {
        id: userId,
      },
    });

    const { title } = await req.body;

    if (notebook) {
      const notebook = await Notebook.addNotebook({
        userId,
        title,
      });
      return res.json(notebook);
    } else {
      const error = new Error("We could not make a notebook");
      error.status = 404;
      next(error);
    }
  })
);

// READ a notebook
router.get(
  "/:userId(\\d+)/notebooks/:notebookId(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { userId, notebookId } = await req.params;

    const notebook = await Notebook.findByPk(notebookId);
    if (notebook.userId !== +userId) {
      const error = new Error("You are not authorized to see this notebook");
      error.status = 404;
      return next(error);
    }

    return res.json(notebook);
  })
);

router.delete(
  "/:userId(\\d+)/notebooks/:notebookId(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { userId, notebookId } = await req.params;
    const notebook = await Notebook.findOne({
      where: { id: notebookId, userId },
    });

    if (notebook) {
      await notebook.destroy();
      return res.json(notebook);
    } else {
      const error = new Error(
        "Something went wrong! We could not find the notebook..."
      );
      error.status = 404;
      next(error);
    }
  })
);

// --------NOTES Routes /api/users/:userId/notes/----------
// READ notes
router.get(
  "/:userId/notes/",
  asyncHandler(async (req, res, next) => {
    const { userId } = await req.params;

    const notes = await Note.findAll({
      where: {
        userId,
      },
      order: [["updatedAt", "DESC"]],
    });

    // if (notes.length > 0) {
    return res.json(notes);
    //   } else {
    //     const error = new Error("We could not find the notes");
    //     error.status = 404;
    //     next(error);
    //   }
  })
);

// CREATE a note
router.post(
  "/:userId/notes/",
  validateNote,
  asyncHandler(async (req, res, next) => {
    const { userId } = await req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const { title, content, notebookId } = await req.body;

    if (user) {
      const note = await Note.addNote({ userId, title, content, notebookId });
      return res.json(note);
    } else {
      const error = new Error("We could not make a note");
      error.status = 404;
      next(error);
    }
  })
);

// READ a note
router.get(
  "/:userId/notes/:noteId",
  validateNote,
  asyncHandler(async (req, res, next) => {
    const { userId, noteId } = await req.params;
    const note = await Note.findOne({
      where: { id: noteId, userId },
    });

    if (note) {
      return res.json(note);
    } else {
      const error = new Error(
        "Something went wrong! We could not find the note..."
      );
      error.status = 404;
      next(error);
    }
  })
);

// UPDATE a note
router.patch(
  "/:userId/notes/:noteId",
  validateNote,
  asyncHandler(async (req, res, next) => {
    const { userId, noteId } = await req.params;
    const note = await Note.findOne({
      where: { id: noteId, userId },
    });

    if (note) {
      const { title, content } = await req.body;
      let notebookId = "";
      if (await req.body.notebookId) {
        notebookId = await req.body.notebookId;
      }
      const editedNote = await Note.editNote({
        note,
        title,
        content,
        notebookId,
      });
      return res.json(editedNote);
    } else {
      const error = new Error(
        "Something went wrong! We could not edit the note..."
      );
      error.status = 404;
      next(error);
    }
  })
);

// DELETE a note
router.delete(
  "/:userId/notes/:noteId",
  asyncHandler(async (req, res, next) => {
    const { userId, noteId } = await req.params;
    const note = await Note.findOne({
      where: { id: noteId, userId },
    });

    if (note) {
      await note.destroy();
      return res.json(note);
    } else {
      const error = new Error(
        "Something went wrong! We could not find the note..."
      );
      error.status = 404;
      next(error);
    }
  })
);

// -------- NOTEBOOKS/NOTES Routes /api/:userId/notebooks/:notebookId/notes/----------
// READ all notes associated with a notebook
router.get(
  "/:userId/notebooks/:notebookId/notes",
  asyncHandler(async (req, res, next) => {
    const { userId, notebookId } = await req.params;

    const notes = await Note.findOne({
      where: {
        userId,
        notebookId,
      },
      order: [["updatedAt", "DESC"]],
    });
    return res.json(notes);
  })
);

// // READ a note associated with a notebook (not necessary?)
// router.get(
//   "/:userId/notebooks/:notebookId/notes/:noteId",
//   validateNote,
//   asyncHandler(async (req, res, next) => {
//     const { userId, notebookId,noteId } = await req.params;
//     const note = await Note.findOne({
//       where: { id: noteId, userId, notebookId },
//     });

//     if (note) {
//       return res.json(note);
//     } else {
//       const error = new Error(
//         "Something went wrong! We could not find the note..."
//       );
//       error.status = 404;
//       next(error);
//     }
//   })
// );

module.exports = router;
