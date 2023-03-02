const router = require('express').Router();

const { Post, User } = require('./../models')

// get all posts
// how to reformat date https://sebhastian.com/sequelize-date-format/
router.get('/', (req, res) => {
    Post.findAll({
            include: [ User ]
        })
        .then ((post) => {
        res.status(200).json(post)
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
            res.status(404).json({msg: `This post does not exist!`});
            } else {
                res.status(200).json(onePost);
            }
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new post
router.post('/', (req,res) => {
    Post.create({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        UsersId: req.body.UsersId
    })
        .then(newPost=>{
            res.status(200).json(newPost);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

// update post
router.put('/:id', (req,res) => {
    Post.update({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        UsersId: req.body.UsersId
    },{
        where: ({
            id: req.params.id
        })
    })
        .then(updatePost => {
            if (!updatePost[0]) {
                res.status(404).json("This post does not exist!");
            } else {
                res.status(200).json(updatePost);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }) 
})
// delete post
router.delete('/:id', (req,res) => {
    Post.destroy({
        where: ({
            id: req.params.id
        })
    })
        .then(delPost => {
            if (delPost === 0) {
                res.status(404).json("This post has already been deleted or does not exist")
            } else {
                res.status(200).json(delPost);
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

module.exports = router;