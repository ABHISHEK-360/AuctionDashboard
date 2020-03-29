//abhishek360

import React, { Component } from 'react';
import * as Colors from '../../configs/Colors';
import TeamForm from '../Forms/TeamForm';
import PlayerForm from '../Forms/PlayerForm';
import UserForm from '../Forms/UserForm';

import {
  Card,
  CardContent,
} from '@material-ui/core';

class ActionViewHolder extends Component{
  constructor(){
    super();
    this.teamForm = React.createRef();
    this.playerForm = React.createRef();
    this.userForm = React.createRef();
  }

  changeMode = (data) =>{
    const control = this.props.control;

    if(control === 'users'){
      this.userForm.current.setDetails(data)
    }
    else if(control === 'teams'){
      this.teamForm.current.setDetails(data)
    }
    else if(control === 'players'){
      this.playerForm.current.setDetails(data)
    }
  }

  renderModeName = (mode, controlName) => {
    if(mode==='edit'){
      return <div style = {{flex: 1, fontSize: 25}}> Edit {controlName.slice(0, -1)} Details  </div>
    }
    else {
      return <div style = {{flex: 1, fontSize: 25}}> Add New {controlName.slice(0, -1)}  </div>
    }
  }

  render(){
    const control = this.props.control;
    const mode = this.props.mode;
    var controlName = control.charAt(0).toUpperCase() + (control.slice(1));
    return (
      <div
        style = {styles.container}
      >
        <Card style = {styles.photosCard}>
            <CardContent
              align = 'center'
              style = {{display: 'flex', flexDirection: 'horizontal', zIndex: 2, padding: 10, backgroundColor: Colors.FOREGROUND_2,}}
            >
              <div
                style = {{flex: 1, fontSize: 25}}
              >
                Actions:
              </div>
              {this.renderModeName(mode, controlName)}
            </CardContent>
            <CardContent style = {{padding: 5, backgroundColor: Colors.WHITE}}>
              {
                control === 'teams' &&
                <TeamForm
                  ref = {this.teamForm}
                  mode = {this.props.mode}
                  handleEditRequest = {this.props.handleEditRequest}
                  handleAddTeam = {this.props.handleAddTeam}
                />
              }
              {
                control === 'players' &&
                <PlayerForm
                  ref = {this.playerForm}
                  mode = {this.props.mode}
                  handleEditRequest = {this.props.handleEditRequest}
                  handleAddPlayer = {this.props.handleAddPlayer}
                />
              }
              {
                control === 'users' &&
                <UserForm
                  ref = {this.userForm}
                  mode = {this.props.mode}
                  handleEditRequest = {this.props.handleEditRequest}
                  handleAddUser = {this.props.handleAddUser}
                />
              }
            </CardContent>
        </Card>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingRight: 10,
  },
  photosCard: {
    width: '100%'
  },
  button: {
    margin: 5,
    color: Colors.WHITE,
    background: Colors.PRIMARY,
  },
};

export default ActionViewHolder;
