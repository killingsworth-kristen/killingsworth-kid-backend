const router = require('express').Router();

//  import route files
const userRoutes = require('./UserRoutes.js');
const postRoutes = require('./PostRoutes.js');
const commentsRoutes = require('./CommentRoutes.js');
const likeRoutes = require('./LikeRoutes.js');
const tokenRoutes = require('./tokenRoutes.js');

// set url path to interpret route files
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentsRoutes);
router.use('/likes', likeRoutes);
router.use('/token', tokenRoutes);

module.exports = router;