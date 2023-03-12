const router = require('express').Router();

const { Comment, Post, User } = require('./../models')

// find all comments
// how to reformat date https://sebhastian.com/sequelize-date-format/
router.get('/', (req, res) => {
    Comment.findAll({
        include: { all: true, nested: true },
        order: [['createdAt', 'DESC']]
    })
        .then ((comment) => {
        res.json(comment)
        })
        .catch((err)=> {
        console.log(err);
        res.status(500).json({msg: err})
        })
});

// find one comment by id
router.get('/:id', (req,res) => {
    Comment.findByPk(req.params.id, {
        include: { all: true, nested: true }
    })
        .then(oneComment=>{
            if(!oneComment) {
            res.status(404).json({msg: `This comment does not exist!`})
            } else {
                res.status(200).json(oneComment)
            }
            
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new comment
router.post('/', (req,res) => {
    Comment.create({
        body: req.body.body,
        PostsId: req.body.PostsId,
        UsersId: req.body.UsersId
    })
        .then(newComment=>{
            res.status(200).json(newComment);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

// update comment
router.put('/:id', (req,res) => {
    Comment.update({
        body: req.body.body,
        PostsId: req.body.PostsId,
        UsersId: req.body.UsersId
    },{
        where: ({
            id: req.params.id
        })
    })
        .then(updateComment => {
            if (!updateComment[0]) {
                res.status(404).json("This comment does not exist!");
            } else {
                res.status(200).json(updateComment);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// delete comment
router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: ({
            id: req.params.id
        })
    })
        .then(delComment => {
            if (delComment === 0) {
                res.status(404).json("This comment has already been deleted or does not exist")
            } else {
                res.status(200).json(delComment);
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

module.exports = router;