const {Router} = require('express');
const router = Router();
const Blog = require('../database/schemas/Blog');

router.get('/', (req, res) => {
  const blogs = Blog.findall();
  if (blogs) {
    res.status(200).send(blogs);
  } else {
    res.status(404).send('Not found');
  }
});

router.get('/:id', (req, res) => {
  const blog = Blog.findOne({id: req.params.id});
  if (blog) {
    res.status(200).send(blog);
  } else {
    res.status(404).send('Not found');
  }
});

module.exports = router;
