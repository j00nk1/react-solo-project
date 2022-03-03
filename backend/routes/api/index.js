const router = require("express").Router();

const sessionRouter = require("./session");
const usersRouter = require("./users");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

// ↓=============TESTING ROUTES=================↓

// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: "FakeUser1",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );

// // GET /api/restore-user
// const { restoreUser } = require("../../utils/auth.js");
// router.get("/restore-user", restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// // GET /api/require-auth
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

// ↑=============TESTING ROUTES=================↑

module.exports = router;
