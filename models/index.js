const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');

// User to Post relationship
User.hasMany(Post, {
    foreignKey: 'Users.id',
    onDelete: 'CASCADE',
});
Post.belongsTo(User, {
    foreignKey: 'Users.id',
});

// User to Comment relationship
User.hasMany(Comment, {
    foreignKey: 'Users.id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'Users.id'
});

// User to Like relationship
User.hasMany(Like,{
    foreignKey: 'Users.id',
    onDelete: 'CASCADE'
});
Like.belongsTo(User, {
    foreignKey: 'Users.id'
});

// Post to Like relationship
Post.hasMany(Like,{
    foreignKey: 'Posts.id',
    onDelete: 'SET NULL'
});
Like.belongsTo(Post,{
    foreignKey: 'Posts.id'
});

// Post to Comment Relationship
Post.hasMany(Comment, {
    foreignKey: 'Posts.id',
    onDelete: 'SET NULL'
});
Comment.belongsTo(Post, {
    foreignKey: 'Posts.id'
});

// Comment to Like Relationship
Comment.hasMany(Like, {
    foreignKey: 'Comments.id',
    onDelete: 'SET NULL'
});
Like.belongsTo(Comment, {
    foreignKey: 'Comments.id'
});

module.exports = { User, Post, Comment, Like };