const express = require('express');
const router = express.Router();

var middleware = require('../../middleware');
var { Teams, Players, sequelize } = require('../../models');

router.post('/add', middleware.checkToken, async(req, res) => {
  try {
    let user = await Players.create(
      Object.assign({
        name: req.body.name,
        desc: req.body.desc,
        dept: req.body.dept,
        role: req.body.role,
        hostel: req.body.hostel,
        bowlingHand: req.body.bowlingHand,
        battingHand: req.body.battingHand,
        phone: req.body.phone,
        whatsApp: req.body.whatsApp,
        availability: req.body.availability,
        price: req.body.price,
        createdAt: new Date()
      })
    );
    //console.log('body--------',req.body);

    return res.json(
      {
        success: true,
        message: 'Player registered successfully.'
      }
    );
  }
  catch(err){
    console.log('player creation err--------',err);
    return res.status(400).send('invalid params');
  }
});

router.get('/list/:pageNo', (req,res) => {
  const page = req.params.pageNo;
  Players.findAndCountAll({
    attributes: ['id','name', 'desc', 'dept', 'hostel', 'role', 'battingHand', 'bowlingHand', 'phone', 'whatsApp', 'availability', 'price', 'picUrl'],
    order: [
      ['id', 'ASC'],
    ],
    include: [{
      attributes: ['name', 'id'],
      model: Teams,
    }],
    offset:((page-1)*20),
    limit: 20,
    subQuery:false
  })
  .then((players) => {
    return res.json({
      success: true,
      count: players.count,
      players: players.rows,
    })
  })
  .catch(e => {
    console.log('get players list err--------', e);
    return res.status(400).send('try again');
  })
});

router.put('/update', middleware.checkToken, async ( req, res ) => {
  const { id, name, captainId, desc, logoUrl, balance } = req.body;
  var playerDetails;

  playerDetails = await Players.findOne({
    where: {
      id: id
    }
  });

  const updatedAt = new Date();
  var data = {};

  if(playerDetails){
    if(name){
      data = {...data, name};
    }
    else if(desc){
      data = {...data, desc};
    }
    else if(dept){
      data = {...data, dept};
    }
    else if(hostel){
      data = {...data, hostel};
    }
    else if(battingHand){
      data = {...data, battingHand};
    }
    else if(bowlingHand){
      data = {...data, bowlingHand};
    }
    else if(phone){
      data = {...data, phone};
    }
    else if(whatsApp){
      data = {...data, whatsApp};
    }
    else if(availability){
      data = {...data, availability};
    }
    else if(price){
      data = {...data, price};
    }

    if(Object.keys(data).length >= 0){
      console.log('data in update player', data);
      await playerDetails.update({updatedAt, ...data});
      return res.json({
        success: true,
        message: 'Player Details Updated',
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

router.get('/:playerId', (req,res) => {
    Players.findOne({
      attributes: ['id','name', 'desc', 'dept', 'hostel', 'role', 'battingHand',
        'bowlingHand', 'phone', 'whatsApp', 'availability', 'price', 'picUrl'],
      include: [
        {
          attributes: ['name', 'id'],
          model: Teams,
        }
      ],
      where: {id: req.params.playerId}
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

router.put('/assignTeam', async (req,res) => {
  const { teamId, playerId, price} = req.body;
  const team = await Teams.findOne({where: {id: req.body.teamId}})
  if(team){
    if(team.balance>=price){
      try {
        const result = await sequelize.transaction(async (t) => {

          const player = await Players.update(
            {
              TeamId: teamId,
              price
            },
            {
              where: {id: playerId}
            },
            {transaction: t}
          )

          const balance = team.balance-price
          await team.update(
            {
              balance
            },
            {transaction: t}
          )

          return player;

        });
      }catch (e) {
        console.log('team assignment error', e);
        return res.status(400).send('invalid params');
      }

      return res.json({
        success: true,
        message: 'team assigned successfully'
      })
    }
    else{
      return res.json({
        success: false,
        message: 'invalid amount'
      })
    }
  }

  return res.status(400).send('invalid params');
})

module.exports = router;
