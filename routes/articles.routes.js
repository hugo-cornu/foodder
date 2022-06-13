const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Article = require("../models/Article.model");

// ------------------ FEED PAGE ------------------ //

// GET ALL POSTS IN THE FEED PAGE
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    res.status(200).json(await Article.find({ private: false }));
  } catch (error) {
    next(error);
  }
});

// GET -> FILTER ARTICLES BY COUNTRIES

// ------------------ PROFILE PAGE ------------------ //

// GET POST FROM A PROFILE PAGE -> FILTER IF USER != PageOwner (Only private posts)

// router.get("/:username", isAuthenticated, async (req, res, next) => {
//   try {
//     username = req.params.username;
//     res.status(200).json(await Article.find({ username }));
//   } catch (error) {
//     next(error);
//   }
// });

// GET -> FILTER ARTICLES BY COUNTRIES

// POST - CREATE A NEW POST
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const articleToCreate = req.body;
    const articleCreated = await Article.create(articleToCreate);
    res.status(201).json(articleCreated);
  } catch (error) {
    next(error);
  }
});

// PATCH - UPDATE A NEW POST
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: `Good job, you updated ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

// DELETE A POST
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Good job, you deleted ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

// ------------------ GENERAL BEHAVIOUR ------------------ //

// GET ONE POST (FULL PAGE) WHEN A USER CLICK ON A POST
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    articleId = req.params.id;
    res.status(200).json(await Article.findById(articleId));
  } catch (error) {
    next(error);
  }
});

// GET -> FILTER ARTICLES BY COUNTRIES ?????

module.exports = router;
