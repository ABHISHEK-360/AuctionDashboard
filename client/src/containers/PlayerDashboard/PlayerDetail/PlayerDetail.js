import React from 'react';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import AuctionBoard from './AuctionBoard/AuctionBoard';
import SimpleModal from '../../../components/Modal/SimpleModal';
import Button from '@material-ui/core/Button';
import classes from './PlayerDetail.module.css';

const PlayerDetail = (props) => {
  let board = null;
  let selectTeamButton = null;

  if(props.player.Team === null){
    board = <AuctionBoard
      score = {props.score}
      increment = {props.increment}
      decrement = {props.decrement}
      modalOpen  =  {props.modalOpen}
      showbutton = {true}
    />
    selectTeamButton = <Button
      style = {{margin: 5}}
      variant = "contained"
      size = "large"
      color = "primary"
      onClick = {props.modalOpen}
    >
      Select Team
    </Button>
  }else{
    let myTeam = props.player.Team;
    board = <AuctionBoard
      score = {props.player.price}
      showbutton = {false}
      team = {myTeam.name}
    />
  }

  return (
    <div>
      <PlayerInfo player={ props.player }/>
      {
        board
      }
      <SimpleModal
        open = {props.openmodal}
        handleClose = {props.modalClose}
        player = { props.player }
        auctionScore = {props.auctionScore}
        playerTeam = {props.playerTeam}
        handleTeamSelect = {props.handleTeamSelect}
        handleSold = {props.handleSold}
        teams = {props.teams}
        loading = {props.loading}
      />
      <div className={classes.button}>
        <Button
          style = {{margin: 5}}
          variant = "contained"
          size = "large"
          color = "secondary"
          onClick = {props.backToForm}
        >
          Back
        </Button>
        {
          selectTeamButton
        }
      </div>
    </div>
  )
}

export default PlayerDetail;
