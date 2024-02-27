const { Router } = require("express");
const router = Router();
const User = require("../database/schemas/User");
const Waitlist = require("../database/schemas/Waitlist");
const Blog = require("../database/schemas/Blog");

router.use("", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
});

router.get("/waitlist", async (req, res) => {
  const waitlists = await Waitlist.find();
  if (waitlists) {
    res.status(200).send(waitlists);
  } else {
    res.status(404).send("Not found");
  }
});

router.get("/blogs", async (req, res) => {
  const author = await User.findOne({ userName: req.session.user.userName });
  const blogs = await Blog.find({ author: author });
  if (blogs) {
    res.status(200).send(blogs);
  } else {
    res.status(404).send("Not found");
  }
});

router.post("/blogs", async (req, res) => {
  const { title, content, coverImage } = req.body;
  if (title && content && coverImage) {
    const author = await User.findOne({ userName: req.session.user.userName });
    const newBlog = new Blog({ title, content, coverImage, author });
    await newBlog.save();
    res.status(201).send("Blog created");
  } else {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
