import React from 'react';
import ImageAvatars from '../../../../components/Avatar/Avatar';
import * as Colors from '../../../../configs/Colors';
import {
  Typography,
  Card,
  Grid
} from '@material-ui/core';
import LetterAvatars from '../../../../components/Positionbadges/Positionbadges';

const PlayerInfo = (props) => {
  const {role, battingHand, bowlingHand } = props.player;

  let playStyle = '';
  let department = props.player.dept
  if(props.player.dept === "Electronics and Telecommunication Engineering"){
    department = "Electronics and Telecommunication"
  }
  if(props.player.deptt === "Architecture, Town and Regional Planning"){
    department = "Architecture"
  }

  if(role === 'Batsman'){
    console.log('player role:', role);
    if(battingHand === 'Right')
      playStyle = 'Right-Hand Batsman'

    if(battingHand === 'Left')
      playStyle = 'Left-Hand Batsman'
  }

  if(role === 'Bowler'){
    if(bowlingHand === 'Right')
      playStyle = 'Right-Hand Bowler'

    if(bowlingHand === 'Left')
      playStyle = 'Left-Hand Bowler'
  }

  if(role === 'All-Rounder'){
    var temp = '';
    if(battingHand === 'Right')
      temp = 'Right-Hand Batsman'

    if(battingHand === 'Left')
      temp = 'Left-Hand Batsman'

    if(bowlingHand === 'Right')
      playStyle = temp + ' & Right-Hand Bowler'

    if(bowlingHand === 'Left')
      playStyle = temp + ' & Left-Hand Bowler'
  }

  return (
    <div style = {{padding: '2%', width: '100%'}}>
        <Card style = {{ width: '96%'}}>
          <Typography
            variant="h3"
            component="h2"
            style = {{padding: 5, color: Colors.WHITE, backgroundColor: Colors.PRIMARY}}
          >
            <strong style = {styles.idText}>{props.player.id}</strong> <t/> {props.player.name.toUpperCase()}
          </Typography>
          <Grid
            container
            spacing = {0}
            justify = 'space-evenly'
          >
            <Grid item xs = {4}>
              <ImageAvatars
                image = {props.player.picUrl}
                size = "big"
                team = {props.player.Team}
              />
            </Grid>
            <Grid align = 'left' item xs = {8}>
              <br/>
              <Typography variant="h5">
                <strong>{playStyle}</strong>
              </Typography>
              <Typography variant="h5">
                Availability: <strong>{props.player.availability}</strong>
              </Typography>
              <Typography variant="h5">
                Dept.: <strong>{department}</strong>
              </Typography>
              <Typography variant="h5">
                Resident of <strong>{props.player.hostel}</strong>
              </Typography>
              <Typography align = 'center' style = {styles.roleFont} variant="h4">
                <strong>{props.player.role.toUpperCase()}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Card>
    </div>
  )
}

const styles = {
  roleFont: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    padding: 5,
    color: Colors.SPECIAL_FONT,
    border: '2px solid #6C6061',
    borderRadius: 5,
    boxShadow: "5px 3px 5px #9E9E9E",
  },
  idText: {
    border: '2px solid #6C6061',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    marginRight: 15,
    color: 'red'
  }
}

export default PlayerInfo;
