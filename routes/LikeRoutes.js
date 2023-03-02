const router = require('express').Router();

const { Like, User, Post } = require('./../models')

// get all likes
router.get('/', (req,res) => {
    Like.findAll({
        include: [ User, Post]
    })
    .then(allLikes => {
        if (!allLikes) {
            res.status(404).json("There are no likes!")
        } else {
            res.status(200).json(allLikes);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// get one like
router.get('/:id', (req,res) => {
    Like.findByPk(req.params.id,{
        include: [ User, Post]
    })
    .then(oneLike => {
        if (!oneLike) {
            res.status(404).json("That like does not exist")
        } else {
            res.status(200).json(oneLike);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// create new Like
router.post('/', (req,res) => {
    Like.create({
        like: req.body.like,
        UsersId: req.body.UsersId,
        PostsId: req.body.PostsId
    })
    .then(newLike => {
        res.status(200).json(newLike);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update like
router.put('/:id', (req,res) => {
    Like.update({
       like: req.body.like,
       UsersId: req.body.UsersId,
       PostsId: req.body.PostsId
    },{
        where: ({
            id: req.params.id
        })
    })
        .then(updateLike => {
            if (!updateLike[0]) {
                res.status(404).json("This like does not exist!");
            } else {
                res.status(200).json(updateLike);
            }
            // res.status(200).json(updateLike);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// delete Like
router.delete('/:id', (req,res) => {
    Like.destroy({
        where: ({
            id: req.params.id
        })
    })
        .then(delLike => {
            if (delLike === 0) {
                res.status(404).json("This like has already been deleted or does not exist")
            } else {
                res.status(200).json(delLike);
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});


module.exports = router;