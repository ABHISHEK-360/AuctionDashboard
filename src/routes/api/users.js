//abhishek360

var middleware = require('../../middleware');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var { Users, Teams } = require('../../models');

router.post('/signup', async(req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);

  try {
    let user = await Users.create(
      Object.assign({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        createdAt: new Date()
      },
      { password: hash })
    );
    //console.log('body--------',req.body);

    return res.json(
      {
        success: true,
        message: 'User registered successfully.'
      }
    );
  }
  catch(err){
    console.log('signup err--------',err);
    return res.status(400).send('invalid params');
  }
});

router.get('/', middleware.checkToken, (req,res) => {
  Users.findAndCountAll({
    attributes: ['id','name', 'email', 'phone', 'role'],
    include: [{
      attributes: ['name', 'id'],
      model: Teams,
    }]
  })
  .then(users => {
    return res.json({
      success: true,
      count: users.count,
      users: users.rows,
    })
  })
  .catch(e => {
    console.log('get players list err--------', e);
    return res.status(400).send('try again');
  })
});

router.put('/update', middleware.checkToken, async ( req, res ) => {
  const { id, name, phone, email, role } = req.body;
  var userDetails;

  userDetails = await Users.findOne({
    where: {
      id: id
    }
  });

  const updatedAt = new Date();
  var data = {};

  if(userDetails){
    if(name){
      data = {...data, name};
    }
    if(phone){
      data = {...data, phone};
    }
    if(email){
      data = {...data, email};
    }
    if(role){
      data = {...data, role};
    }

    if(Object.keys(data).length >= 0){
      console.log('data in update user', data);
      await userDetails.update({updatedAt, ...data});
      return res.json({
        success: true,
        message: 'User Details updated',
      })
    }
    else {
      return res.json({
        success: false,
        message: 'invalid params',
      })
    }
  }
  else{
    return res.json({
      success: false,
      message: 'invalid params',
    })
  }
});

router.get('/:userId', middleware.checkToken, (req,res) => {
    Users.findOne({
      attributes: ['id','name', 'email', 'phone','role'],
      include: [
        {
          attributes: ['name', 'id'],
          model: Teams,
        }
      ],
      where: {id: req.params.userId},
    })
    .then(player => {
      return res.json({
        success: true,
        ...player.dataValues,
      })
    })
    .catch(e => {
      console.log('get player by id err--------', e);
      return res.status(400).send('try again');
    })
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if(!username||!password){
    return res.status(400).send(
      'missing login details params'
    );
  }

  try {
    let user = await Users.authenticate(username, password);

    return res.json(
      {
        success: true,
        id: user.user.id,
        role: user.user.role,
        name: user.user.name,
        phone: user.user.phone,
        email: user.user.email,
        token: user.authToken
      }
    );
  }
  catch(err) {
    console.log('err in login', err);
    return res.status(400).send(
      'invalid username or password'
    );
  }
})

router.put('/logout', async(req, res) => {
  const authToken = req.header('xyz-access-token');

  if(authToken) {
    const result = await Users.logout(authToken);
    return res.send(
      {
        success: result,
        message: 'user logged out successfully!'
      }
    );
  }

  return res.status(400).send(
    {
      success: false,
      message: 'not authenticated'
    }
  );
})


module.exports = router;
