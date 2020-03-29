const express = require('express');
const router = express.Router();

var middleware = require('../../middleware');
var { Teams, Users, Players } = require('../../models');

router.post('/add', middleware.checkToken, async(req, res) => {
  const captainId = req.body.captainId;
  var initialBalance = 10000;
  if(req.body.balance)
    initialBalance = req.body.balance;

  try {
    let user = await Teams.create(
      Object.assign({
        name: req.body.name,
        desc: req.body.desc,
        logoUrl: req.body.logoUrl,
        captainId: captainId,
        balance: initialBalance,
        createdAt: new Date()
      })
    );
    //console.log('body--------',req.body);

    return res.json(
      {
        success: true,
        message: 'Team registered successfully.'
      }
    );
  }
  catch(err){
    console.log('team creation err--------',err);
    return res.status(400).send('invalid params');
  }
});

router.get('/', (req,res) => {
    Teams.findAll({
      attributes: ['id','name', 'desc', 'logoUrl', 'balance'],
      include: [
        {
          attributes: ['name', 'id'],
          model: Users,
          as: 'captain',
          required: false
        },
        {
          attributes: ['name', 'id', 'dept', 'role', 'hostel', 'price'],
          model: Players,
          as: 'players',
          required: false
        }
      ]
    })
    .then(teams => {
      return res.json({
        success: true,
        count: teams.length,
        teams,
      })
    })
    .catch(e => {
      console.log('get team list err--------', e);
      return res.status(400).send('try again');
    })
});

router.put('/update', middleware.checkToken, async ( req, res ) => {
  const { teamId, name, captainId, desc, logoUrl, balance } = req.body;
  var teamDetails;

  teamDetails = await Teams.findOne({
    where: {
      id: teamId
    }
  });

  const updatedAt = new Date();
  var data = {};

  if(teamDetails){
    if(name){
      data = {...data, name};
    }
    else if(captainId){
      data = {...data, captainId};
    }
    else if(desc){
      data = {...data, desc};
    }
    else if(balance){
      data = {...data, balance};
    }

    if(Object.keys(data).length >= 0){
      console.log('data in update user', data);
      await teamDetails.update({updatedAt, ...data});
      return res.json({
        success: true,
        message: 'Team Details Updated',
      })
    }
    else {
      return res.status(400).send('invalid params');
    }
  }
  else{
    return res.status(400).send('invalid params');
  }
});

router.put('/remove', middleware.checkToken, async ( req, res ) => {
  const { teamId } = req.body;
  var teamDetails;

  teamDetails = await Teams.destroy({
    where: {
      id: teamId
    }
  });

  if(teamDetails){
    return res.json({
      success: true,
      message: 'Team Removed Successfully!',
    })
  }

  return res.status(400).send('invalid params')
});

router.get('/:teamId', (req,res) => {
    Teams.findOne({
      attributes: ['id','name', 'desc', 'logoUrl', 'balance'],
      include: [
        {
          attributes: ['name', 'id'],
          model: Users,
          as: 'captain',
          required: false
        },
        {
          attributes: ['name', 'id', 'dept', 'role', 'hostel', 'whatsApp', 'price'],
          model: Players,
          as: 'players',
          required: false
        }
      ],
      where: {id: req.params.teamId}
    })
    .then(team => {
      return res.json({
        success: true,
        ...team.dataValues,
        noOfPlayers: team.players.length,
      })
    })
    .catch(e => {
      console.log('get team list err--------', e);
      return res.status(400).send('try again');
    })
});

module.exports = router;
