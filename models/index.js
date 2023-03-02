const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');

// User to Post relationship
User.hasMany(Post, {
    foreignKey: 'UsersId',
    onDelete: 'CASCADE',
    allowNull: false,
});
Post.belongsTo(User, {
    foreignKey: 'UsersId',
    allowNull: false,
});

// User to Comment relationship
User.hasMany(Comment, {
    foreignKey: 'UsersId',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'UsersId'
});

// User to Like relationship
User.hasMany(Like,{
    foreignKey: 'UsersId',
    onDelete: 'CASCADE'
});
Like.belongsTo(User, {
    foreignKey: 'UsersId'
});

// Post to Like relationship
Post.hasMany(Like,{
    foreignKey: 'PostsId',
    onDelete: 'SET NULL'
});
Like.belongsTo(Post,{
    foreignKey: 'PostsId'
});

// Post to Comment Relationship
Post.hasMany(Comment, {
    foreignKey: 'PostsId',
    onDelete: 'SET NULL'
});
Comment.belongsTo(Post, {
    foreignKey: 'PostsId'
});

// Comment to Like Relationship
// Comment.hasMany(Like, {
//     foreignKey: 'Comments.id',
//     onDelete: 'SET NULL'
// });
// Like.belongsTo(Comment, {
//     foreignKey: 'Comments.id'
// });

module.exports = { User, Post, Comment, Like };