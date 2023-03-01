// connect to SQL DB
const connection = require('../config/connection');

// Import the models
const { User, Post, Comment } = require('../models');

// import the seed data
const userData = require('./User.json');
const postData = require('./Post.json');
const commentData = require('./Comment.json');

const seedAll = async () => {

    await connection.sync({force: true})

    // Drop existing data
    // await User.deleteMany({});
    // await Post.deleteMany({});

    // create new data
    await User.bulkCreate(userData);
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData)

    process.exit(0);
};

seedAll()
