const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit blog route
router.put('/:id', withAuth, async (req, res) => {

  try {
    const blogData = await Blog.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,
      },
      {
        // Gets the blog based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Create Comment Route
router.post('/comment/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
