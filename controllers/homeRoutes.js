const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const dbPostData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('single-post', {
      post,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/posts-comments', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('posts-comments', {
      post,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
