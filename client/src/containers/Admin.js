//abhishek360
import React, { Component } from 'react';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import ActionViewHolder from '../components/ViewHolder/ActionViewHolder';
import ListViewHolder from '../components/ViewHolder/ListViewHolder';
import Popup from '../components/Popup';
import RequestService from '../services/RequestService';
import AuthHOC from '../HOC/AuthHOC';
import * as Colors from '../configs/Colors'

class Admin extends Component{
  state = {
    loggedIn: true,
    userDetails: {name: 'A360'},
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNDNmNDVmYS03ODYyLTRmODctOTVlYi1lNDU3OWQ1ZTU4MzMiLCJ1c2VybmFtZSI6ImEzNjBAYWRtaW4uZGV2IiwiaWF0IjoxNTg1NDg5MzM1LCJleHAiOjE1ODU1NzU3MzV9.OUh3LKbzJhIsCPjny2hVn8pfR2vrJhxak35vxas3khU",
    control: 'players',
    actionMode: 'add',
    count: 0,
    users: [],
    players: [],
    teams: [],
  }

  constructor(){
    super();
    this.actionViewHolder = React.createRef();
    this.adminRequests = new RequestService('users','ADMIN');
    this.playersRequests = new RequestService('players','ADMIN');
    this.teamsRequests = new RequestService('teams','ADMIN');
  }

  componentDidMount(){
    this.loadPlayers(1);
  }

  loadPlayers = (pageNo) => {
    this.playersRequests.get('list/'+pageNo).then(res => {
      console.log('data in get players', res);
      this.setState({
        count: res.count,
        players: res.players
      })
    })
  }

  loadTeams = () => {
    this.teamsRequests.get().then(res => {
      console.log('data in get teams', res);
      this.setState({
        count: res.count,
        teams: res.teams
      })
    })
  }

  loadUsers = () => {
    this.adminRequests.get('', this.state.token).then(res => {
      console.log('data in get users', res);
      this.setState({
        count: res.count,
        users: res.users
      })
    })
  }

  setModeData = (mode, id) => {
    const control = this.state.control;

    if(mode === 'edit'){
      if(control === 'users'){
        this.adminRequests.get(id).then(res => {
            console.log('edit user data', res)
            this.setState({
              actionMode: 'edit'
            },this.actionViewHolder.current.changeMode(res))
          }
        )
      }
      else if(control === 'teams'){
        this.teamsRequests.get(id).then(res => {
            console.log('edit team data', res)
            this.setState({
              actionMode: 'edit'
            },this.actionViewHolder.current.changeMode(res))
          }
        )
      }
      else if(control === 'players'){
        this.playersRequests.get(id).then(res => {
            console.log('edit player data', res)
            this.setState({
              actionMode: 'edit'
            },this.actionViewHolder.current.changeMode(res))
          }
        )
      }

    }
  }

  changeControl = (control) =>{
    if(control === 'users'){
      this.loadUsers();
    }
    else if(control === 'teams'){
      this.loadTeams();
    }
    else if(control === 'players'){
      this.loadPlayers(1);
    }

    this.setState({
      control,
      actionMode: 'add'
    })
  }

  handleEditRequest = async (data) => {
    const token = this.state.token;
    const control = this.state.control;

    if(control === 'users'){
      this.adminRequests.put(data, 'update', token).then(res => {
        console.log('res edit user', res);
      })
    }
    else if(control === 'teams'){
      this.teamsRequests.put(data, 'update', token).then(res => {
        console.log('res edit team', res);
      })
    }
    else if(control === 'players'){
      this.playersRequests.put(data, 'update', token).then(res => {
        console.log('res edit player', res);
      })
    }

  }

  handleAddTeam = async (team) => {
    const token = this.state.token;
    this.teamsRequests.post(team, 'add', token ).then(res => {
      console.log('res add team', res);
    })
  }

  handleAddPlayer = async (player) => {
    const token = this.state.token;
    this.playersRequests.post(player, 'add', token ).then(res => {
      console.log('res add player', res);
    })
  }

  handleAddUser = async (user) => {
    const token = this.state.token;
    this.adminRequests.post(user, 'signup', token ).then(res => {
      console.log('res add user', res);
    })
  }

  handleLogin = async ( username, password ) => {
    const data = await this.adminRequests.auth( username, password );
    console.log('loginnnnnnnnnnnnnnn', data);
    if(data.success){
      //alert('User Logged In!');
      this.setState({
        userDetails: {
          id: data.id,
          name: data.name,
          role: data.role,
          phone: data.phone,
          email: data.email,
        },
        token: data.token,
        loggedIn: true
      });
    }
    else{
      alert('Try Again, Failed to Login!');
    }
  }

  handlePageChange = (pageNo) => {
    if(this.state.control === 'players'){
      this.loadPlayers(pageNo)
    }
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      userDetails: {},
      token: '',
    });
  }

  render(){
    return (
      <div
        align = 'center'
        style = {styles.container}
      >
        {
          (!this.state.loggedIn) &&
            <Popup
              handleLogin = { this.handleLogin }
            />
        }
        <Header
          loggedIn = {this.state.loggedIn}
          userDetails = {this.state.userDetails}
          handleLogout = { this.handleLogout }
          togglePopup = { this.togglePopup }
        />
        <LeftPanel
          control = {this.state.control}
          changeControl = {this.changeControl}
          loggedIn = {this.state.loggedIn}
        />
        <AuthHOC
          loggedIn = {this.state.loggedIn}
          yes = {() =>
            <div style = {{marginLeft: '11%', marginRight: 10}}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={7}>
                  <ActionViewHolder
                    ref = {this.actionViewHolder}
                    control = {this.state.control}
                    mode = {this.state.actionMode}
                    handleEditRequest = {this.handleEditRequest}
                    handleAddTeam = {this.handleAddTeam}
                    handleAddPlayer = {this.handleAddPlayer}
                    handleAddUser = {this.handleAddUser}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <ListViewHolder
                    control = {this.state.control}
                    handlePage = {this.handlePageChange}
                    setModeData = {this.setModeData}
                    count = {this.state.count}
                    users = {this.state.users}
                    players = {this.state.players}
                    teams = {this.state.teams}
                  />
                </Grid>
              </Grid>
            </div>
          }
          no = {() =>
            <div align = 'center' >
              <h2>Admin panel</h2>
            </div>
          }
        />
      </div>
    );
  }
}

const styles = {
  container: {
    paddingTop: 50,
    width: '100vw'
  },
};

export default Admin;
