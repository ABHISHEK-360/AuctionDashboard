//abhishek360

import React, { Component } from 'react';
import * as Colors from '../../configs/Colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class TeamForm extends Component {
  state= {
    id: '',
    team_name: '',
    captain_id: '',
    desc: '',
    balance: '',
  }

  verifyForm = (mode) => {
    const {id, team_name, captain_id, desc, balance } = this.state;
    if(team_name===''){
      alert('Team Name is Required!');
      return;
    }
    else if(captain_id===''){
      alert('Valid Captain Id is Required!');
      return;
    }
    else{
      if(mode==='edit'){
        if(id===''){
          alert('Invalid team Id!');
          return;
        }
        else{
          console.log('state of team', this.state);
          this.props.handleEditRequest({
            teamId: id,
            name: team_name,
            desc: desc,
            captainId: captain_id,
            balance,
          });
        }
      }
      else{
        this.props.handleAddTeam({
          name: team_name,
          desc: desc,
          captainId: captain_id,
          balance,
        });
      }
    }
  }

  setDetails = (data) => {
    this.setState({
      id: data.id,
      team_name: data.name,
      captain_id: data.captain.id,
      desc: data.desc,
      balance: data.balance,
    })
  }

  clearFields = () => {
    this.setState({
      id: '',
      team_name: '',
      captain_id: '',
      desc: '',
      balance: '',
    })
  }

  render() {
    const mode = this.props.mode;
    return (
        <div
          align = 'start'
          style = { styles.container }
        >
          <div style = {{ flexDirection: 'horizontal', display: 'flex',}}>
            <TextField
              required
              variant = "outlined"
              label = "Team Name:"
              placeholder = "Aztecs"
              style = { styles.textField }
              value = {this.state.team_name}
              onChange = {(event) => this.setState({team_name: event.target.value})}
            />
            <div style = {{flex: 1}}></div>
            {
              mode ==='edit' ?
                <h3
                  style = {styles.idText}>
                  ID: {this.state.id}
                </h3> :
                <div style = {{flex: 1}}></div>
            }
          </div>
          <br/>
          <TextField
            required
            variant = "outlined"
            label = "Captain Id:"
            placeholder = "01"
            style = { styles.textField }
            value = {this.state.captain_id}
            onChange = {(event) => this.setState({captain_id: event.target.value})}
          />
          <br/>
          <TextField
            variant = "outlined"
            label = "Description"
            placeholder = "About team"
            style = { styles.textField }
            value = {this.state.desc}
            onChange = {(event) => this.setState({desc: event.target.value})}
          />
          <TextField
            variant = "outlined"
            label = "Initial Balance"
            placeholder = "10000"
            style = { styles.textField }
            value = {this.state.balance}
            onChange = {(event) => this.setState({balance: event.target.value})}
          />
          <div
            align = 'center'
          >
            <Button
              color = 'default'
              style={styles.button}
              onClick={(event) => this.verifyForm(mode)}
            >
              Save
            </Button>
            <Button
              color = 'default'
              style={styles.button}
              onClick={(event) => this.clearFields()}
            >
              Clear
            </Button>
          </div>
        </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
  },
  textField: {
    marginLeft: 10,
    marginTop: 10,
  },
  idText: {
    textAlign: 'center',
    padding: 5,
    flex: 1,
    color: Colors.PRIMARY_SPECIAL,
    border: '3px solid red',
    borderRadius: 5,
  },
  button: {
    margin: 10,
    color: Colors.WHITE,
    background: Colors.PRIMARY,
  },
  footerButton: {
    margin: 10,
    color: Colors.WHITE,
    background: Colors.PRIMARY,
  },
};

export default TeamForm;
