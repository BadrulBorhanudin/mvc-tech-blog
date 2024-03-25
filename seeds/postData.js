const { Post } = require('../models');

const postdata = [
  {
    postTitle: 'Why MVC is so important',
    postContent:
      'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    userId: 1,
  },
  {
    postTitle: 'Authentication vs. Authorization',
    postContent:
      'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    userId: 2,
  },
  {
    postTitle: 'Object-Relational Mapping',
    postContent:
      "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
    userId: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
