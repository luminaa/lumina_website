const { Router } = require("express");
const router = Router();
const Blog = require("../database/schemas/Blog");

router.get("", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(404).send("Not found");
  }
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findOne({ id: req.params.id });
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).send("Not found");
  }
});

module.exports = router;
