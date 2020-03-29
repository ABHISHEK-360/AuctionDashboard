//abhishek360

import React, { Component } from 'react';
import * as Colors from '../../configs/Colors';
import {
  Grid,
  Typography,
  Card,
  List,
  ListItem,
  CardContent,
  CardMedia,
  Button
} from '@material-ui/core';
import Pagination from '../Pagination';


class ListViewHolder extends Component{
  roleText = (role, battingHand, bowlingHand) => {
    if(role === 'Batsman'){
      if(battingHand === 'Right')
        return 'Right-Hand Batsman'

      if(battingHand === 'Left')
        return 'Left-Hand Batsman'
    }

    if(role === 'Bowler'){
      if(bowlingHand === 'Right')
        return 'Right-Hand Bowler'

      if(bowlingHand === 'Left')
        return 'Left-Hand Bowler'
    }

    if(role === 'All-Rounder'){
      var temp = '';
      if(battingHand === 'Right')
        temp = 'Right-Hand Batsman'

      if(battingHand === 'Left')
        temp = 'Left-Hand Batsman'

      if(bowlingHand === 'Right')
        return temp + ' & Right-Hand Bowler'

      if(bowlingHand === 'Left')
        return temp + ' & Left-Hand Bowler'
    }
  }

  renderDetails = (item, viewType) => {
    switch(viewType) {
      case 'teams' :
        return <div>
          <Typography
            style = {{fontSize: 12}}
          >
            Captain: { item.captain.name.toUpperCase() }
          </Typography>
          <Typography
            style = {{fontSize: 12}}
          >
            No. of Players: { item.players.length }
          </Typography>
          <Typography
            style = {{fontSize: 16}}
          >
            Wallet Balance: { item.balance }
          </Typography>
        </div>

      case 'players' :
        const role = this.roleText(item.role, item.battingHand, item.bowlingHand);
        return <div>
          <Typography
            style = {{fontSize: 14}}
          >
            Role: { role  }
          </Typography>
          <Typography
            style = {{fontSize: 12}}
          >
            Department: { item.dept }
          </Typography>
          <Typography
            style = {{fontSize: 12}}
          >
            Resident of { item.hostel }
          </Typography>
          <Typography
            style = {{fontSize: 12}}
          >
            Price: { item.price }
          </Typography>
        </div>

      case 'users' :
        return <div>
          <Typography
            style = {{fontSize: 12}}
          >
            Phone: { item.phone }
          </Typography>
          <Typography
            style = {{fontSize: 12}}
          >
            Email: { item.email }
          </Typography>
          <Typography
            style = {{fontSize: 12}}
          >
            Role: { item.role.toUpperCase() }
          </Typography>
        </div>

      default:
        return  <div></div>
    }
  }

  renderList = (item, viewType) => {
    var imgSrc = '';
    switch(viewType){
      case 'players' :
        imgSrc = item.picUrl;
        break;

      case 'teams' :
        imgSrc = item.logoUrl;
        break;

      default :
       imgSrc = '';
    }
    return (
      <ListItem
        key = {item.id}
        align = 'start'
        style = {{zIndex: 3, borderRadius: 2, backgroundColor: Colors.BACKGROUND, margin: 5,}}
      >
        <Grid
          container
          spacing = {8}
          justify = 'space-evenly'
        >
          <Grid item xs = {4}>
            <CardMedia
              component = "img"
              alt = "Logo"
              style = {{height: '15vh'}}
              image = {imgSrc}
            />
          </Grid>
          <Grid item xs = {8}>
            <Typography
              style = {{textDecoration: 'underline', fontSize: 20}}
            >
              { item.name.toUpperCase() }
            </Typography>
            <Typography
              style = {{fontSize: 14}}
            >
              Id: { item.id }
            </Typography>
            {this.renderDetails(item, viewType)}
            <div align = 'end'>
              <Button
                size = 'small'
                style = {styles.button}
              >
                Delete
              </Button>
              <Button
                size = 'small'
                style = {styles.button}
                onClick = {() => this.props.setModeData('edit', item.id)}
              >
                Edit
              </Button>
            </div>
          </Grid>
        </Grid>
      </ListItem>
    )
  }
  render(){
    const viewType = this.props.control;
    return (
      <Card style = {styles.photosCard}>
        <CardContent
          style = {{display: 'flex', flexDirection: 'horizontal', zIndex: 2, padding: 2, backgroundColor: Colors.FOREGROUND_2,}}
        >
          <div
            style = {{flex: 1, paddingTop:10, fontSize: 25}}
          >
            List Items:
          </div>
          <Pagination
            totalRecords = {this.props.count}
            onPageChanged = {(pageData) =>
              this.props.handlePage(pageData.currentPage)
            }
          />
        </CardContent>
        <List style={{height: '80vh', overflow: 'scroll'}}>
          {
            viewType === 'users' && this.props.users.map(item =>
              this.renderList(item, this.props.control)
            )
          }
          {
            viewType === 'teams' && this.props.teams.map(item =>
              this.renderList(item, this.props.control)
            )
          }
          {
            viewType === 'players' && this.props.players.map(item =>
              this.renderList(item, this.props.control)
            )
          }
        </List>
      </Card>
    );
  }
}

const styles = {
  photosCard: {
    height: '100%',
    width: '100%'
  },
  button: {
    marginLeft: 5,
    color: 'white',
    background: Colors.PRIMARY,
  },
};

export default ListViewHolder;
