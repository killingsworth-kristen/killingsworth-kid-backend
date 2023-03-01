const router = require('express').Router();

//  import route files
const userRoutes = require('./UserRoutes.js');
const postRoutes = require('./PostRoutes.js');
const commentsRoutes = require('./CommentRoutes.js');

// set url path to interpret route files
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;