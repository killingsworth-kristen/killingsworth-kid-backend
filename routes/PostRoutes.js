const router = require('express').Router();
const jwt = require('jsonwebtoken')

const { Post, User, Comment, Like } = require('./../models')

// get all posts
// how to reformat date https://sebhastian.com/sequelize-date-format/
router.get('/', (req, res) => {
    Post.findAll({
        include: { all: true, nested: true }
        })
        .then ((post) => {
            res.status(200).json(post)
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).json({msg: err})
        });
});

// get one post by id
router.get('/:id', (req,res) => {
    Post.findByPk(req.params.id, {
         include: { all: true, nested: true }
    })
        .then(onePost=>{
            if(!onePost) {
            res.status(404).json({msg: `This post does not exist!`});
            } else {
                res.status(200).json(onePost);
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new post
router.post('/', (req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token !== process.env.ADMIN_TOKEN) {
        res.status(401).json("Only an admin can create a new post!")
        return;
    } else {
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
            });
    }
    });
    

// update post
router.put('/:id', (req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token !== process.env.ADMIN_TOKEN) {
        res.status(401).json("Only an admin can update a new post!")
        return;
    } else {
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
            }) ;
    }
    });

// delete post
router.delete('/:id', (req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token !== process.env.ADMIN_TOKEN) {
        res.status(401).json("Only an admin can update a new post!")
        return;
    } else {
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
            });
    }
    });

module.exports = router;