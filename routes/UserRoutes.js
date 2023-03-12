const router = require('express').Router();
const { User } = require('./../models')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);

let payload

// post token
router.post('/token', (req, res) => {
    async function verify (token) {
        const ticket = await client.verifyIdToken({
         idToken: token,
         audience: process.env.CLIENT_ID
        })
        payload = ticket.getPayload()
        console.log("verify function is being called")
        return payload
       }
        verify(req.body.token)
        .then((payload)=>{
            res.status(200).json(payload);
            console.log(payload)
        }).catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
});

// find one user by token
router.get('/token', (req, res) => {
    User.findByPk(payload.sub)
    .then((oneUserbyToken)=>{
        if(oneUserbyToken) {
            res.status(200).json()
        } else {
            User.create(
                {email: payload.email,
                familyName: payload.family_name,
                givenName: payload.given_name,
                googleId: payload.sub,
                imageUrl: payload.picture,
                name: payload.name,
                }
            ).then((newUser)=>{
                res.status(200).json()
            }).catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            })
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    });
});

// find all users
router.get('/', (req, res) => {
    User.findAll()
        .then ((user) => {
        res.json(user)
        })
        .catch((err)=> {
        console.log(err);
        res.status(500).json({msg: err})
        })
});

// find one user by id
router.get('/:id', (req,res) => {
    User.findByPk(req.params.id)
        .then(oneUser=>{
            if(!oneUser) {
            res.status(404).json({msg: `This user does not exist!`});
            } else {
                res.status(200).json(oneUser);
            }
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new user
router.post('/login', (req,res) => {
    User.create({
        email: req.body.email,
        familyName: req.body.familyName,
        givenName: req.body.givenName,
        googleId: req.body.googleId,
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        isAdmin: req.body.isAdmin,
    })
        .then(newUser=>{
            res.status(200).json(newUser);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// update user
router.put('/:id', (req,res) => {
    User.update({
        email: req.body.email,
        familyName: req.body.familyName,
        givenName: req.body.givenName,
        googleId: req.body.googleId,
        imageUrl: req.body.imageUrl,
        name: req.body.name
    },{
        where: ({
            googleId: req.params.id
        })
    })
        .then(updateUser => {
            if (!updateUser[0]) {
                res.status(404).json("This user does not exist!");
            } else {
                res.status(200).json(updateUser);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// delete user
router.delete('/:id', (req,res) => {
    User.destroy({
        where: ({
            googleId: req.params.id
        })
    })
        .then(delUser => {
            if (delUser === 0) {
                res.status(404).json("This user has already been deleted or does not exist")
            } else {
                res.status(200).json(delUser);
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

module.exports = router;