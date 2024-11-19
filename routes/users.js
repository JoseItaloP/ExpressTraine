const express = require("express")
const router = express.Router()

let users = [
    {
        id: 1,
        userName: 'josé'
    },
    {
        id: 2,
        userName: 'pedro'
    },
    {
        id: 3,
        userName: 'mane'
    }
]

router.get('/', (req, res, next)=>{
    res.status(200).json(users)
})

router.get('/:user', (req, res, next)=>{
    const user = req.params.user
    const userPast = users.find((userr) => userr.userName === user)
    if(!users){
        return res.status(400).send('User not found')
    }
    res.status(200).json(userPast)
})

router.post('/', (req, res)=>{
    console.log('Request Body:', req.body);
    const newPutUser = {
        id: users.length + 1,
        userName: req.body.userName,
    }
    const findUser = users.find((user) => newPutUser.userName === user.userName)
    if(findUser){
        return res.status(400).json({msg: 'User alredy exist'})
    }
    if(!newPutUser.userName){
        return res.status(400).json({msg: 'Include a username'})
    }

    users.push(newPutUser)
    res.status(201).json(users)
})

router.delete('/:user', (req, res, next)=>{
    const user = req.params.user
    const userExists = users.some((userr) => userr.userName === user);
    if (!userExists) {
        return res.status(404).json({ msg: 'User not found' });
    }
    const newUsers = users.filter((userr) => userr.userName !== user)
    users = newUsers
    res.status(200).json(users)
})

router.put('/:id', (req, res, next)=>{
    const id = parseInt(req.params.id)
    const user = users.find((u)=> u.id === id)

    if(!user){
        return res.status(400).json({msg: 'User not exist with this id'})
    }

    user.userName = req.body.userName
    res.status(200).json(users)
})

module.exports = router