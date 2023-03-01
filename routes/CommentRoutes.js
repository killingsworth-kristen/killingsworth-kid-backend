const router = require('express').Router();

const { Comment, Post, User } = require('./../models')

// find all comments
router.get('/', (req, res) => {
    Comment.findAll({
        include:[ Post, User ],
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
        include: [ Post, User]
    })
        .then(oneComment=>{
            if(!oneComment) {
            res.status(404).json({msg: `This comment does not exist!`})
            }
            res.json(oneComment)
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new comment

// update comment

// delete comment

module.exports = router;