const router = require('express').Router();

const { Post, User } = require('./../models')

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
            include: [ User ]
        })
        .then ((post) => {
        res.json(post)
        })
        .catch((err)=> {
        console.log(err);
        res.status(500).json({msg: err})
        })
});

// get one post by id
router.get('/:id', (req,res) => {
    Post.findByPk(req.params.id)
        .then(onePost=>{
            if(!onePost) {
            res.status(404).json({msg: `This post does not exist!`})
            }
            res.json(onePost)
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new post

// update post

// delete post

module.exports = router;