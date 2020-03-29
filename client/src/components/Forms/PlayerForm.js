//abhishek360

import React, { Component } from 'react';
import * as Colors from '../../configs/Colors';
import Button from '@material-ui/core/Button';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

class PlayerForm extends Component {
  state= {
    id: '',
    name: '',
    phone: '',
    whatsApp: '',
    role: '',
    battingHand: '',
    bowlingHand: '',
    hostel: '',
    dept: '',
    price: '',
    availability: '',
  }

  verifyForm = () => {
    const mode = this.props.mode;
    const {id, name, phone, whatsApp, role, battingHand, bowlingHand, hostel, dept, price, availability} = this.state;
    if(name===''){
      alert('Team Name is Required!');
      return;
    }
    else if(phone===''){
      alert('Phone No is Required!');
      return;
    }
    else if(whatsApp===''){
      alert('WhatsApp No is Required!');
      return;
    }
    else if(role===''){
      alert('Playing Role is Required!');
      return;
    }
    else if(hostel===''){
      alert('Resident is Required!');
      return;
    }
    else if(dept===''){
      alert('Dept. details are Required!');
      return;
    }
    else if(availability===''){
      alert('Availability is Required!');
      return;
    }
    else{
      if(mode==='edit'){
        if(id===''){
          alert('Invalid Player Id!');
          return;
        }
        else{
          console.log('state of team', this.state);
          this.props.handleEditRequest({
            id: id,
            name: name,
            phone,
            whatsApp,
            role,
            hostel,
            dept,
            battingHand,
            bowlingHand,
            availability,
            price,
          });
        }
      }
      else{
        this.props.handleAddPlayer({
          name: name,
          phone,
          whatsApp,
          role,
          hostel,
          dept,
          battingHand,
          bowlingHand,
          availability,
          price,
        });
      }
    }
  }

  setDetails = (data) => {
    this.setState({
      id: data.id,
      name: data.name,
      phone: data.phone,
      whatsApp: data.whatsApp,
      role: data.role,
      hostel: data.hostel,
      dept: data.dept,
      battingHand: data.battingHand,
      bowlingHand: data.bowlingHand,
      availability: data.availability,
      price: data.price,
    })
  }

  clearFields = () => {
    this.setState({
      id: '',
      name: '',
      phone: '',
      whatsApp: '',
      role: '',
      hostel: '',
      dept: '',
      battingHand: '',
      bowlingHand: '',
      availability: '',
      price: '',
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
              label = "Full Name:"
              placeholder = "Abhishek Kumar"
              style = {{ ...styles.textField, flex: 1 }}
              value = {this.state.name}
              onChange = {(event) => this.setState({name: event.target.value})}
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
            label = "Phone:"
            placeholder = "8234567890"
            style = { styles.textField }
            value = {this.state.phone}
            onChange = {(event) => this.setState({phone: event.target.value})}
          />
          <TextField
            required
            variant = "outlined"
            label = "WhatsApp"
            placeholder = "8234567890"
            style = { styles.textField }
            value = {this.state.whatsApp}
            onChange = {(event) => this.setState({whatsApp: event.target.value})}
          />
          <br/>
          <TextField
            required
            variant = "outlined"
            label = "Hostel/Hall/Day Scholars"
            placeholder = "Sen Hall"
            style = { styles.textField }
            value = {this.state.hostel}
            onChange = {(event) => this.setState({hostel: event.target.value})}
          />
          <TextField
            required
            variant = "outlined"
            label = "Dept./Course/Yr"
            placeholder = "IT/UG/4th"
            style = { styles.textField }
            value = {this.state.dept}
            onChange = {(event) => this.setState({dept: event.target.value})}
          />
          <br/>
          <FormControl
            variant="outlined"
            style = { styles.textField }
            required
          >
            <InputLabel id= 'role_select_label'>Role</InputLabel>
            <Select
              labelid = 'role_select_label'
              id="gender"
              variant= "outlined"
              value = {this.state.role}
              onChange= {(event) => this.setState({role: event.target.value})}
            >
              <MenuItem value= 'Batsman'>Batsman</MenuItem>
              <MenuItem value= 'Bowler'>Bowler</MenuItem>
              <MenuItem value= 'All-Rounder'>All-Rounder</MenuItem>
            </Select>
          </FormControl>
          {
            (this.state.role === 'Batsman' || this.state.role === 'All-Rounder') &&
              <FormControl
                variant="outlined"
                style = { styles.textField }
                required
              >
                <InputLabel id= 'batting_select_label'>Batting Hand:</InputLabel>
                <Select
                  labelid = 'batting_select_label'
                  id="gender"
                  variant= "outlined"
                  value = {this.state.battingHand}
                  onChange= {(event) => this.setState({battingHand: event.target.value})}
                >
                  <MenuItem value= 'Left'>Left</MenuItem>
                  <MenuItem value= 'Right'>Right</MenuItem>
                </Select>
              </FormControl>
          }
          {
            (this.state.role === 'Bowler'|| this.state.role === 'All-Rounder') &&
              <FormControl
                variant="outlined"
                style = { styles.textField }
                required
              >
                <InputLabel id = 'bowling_select_label'>Bowling Hand:</InputLabel>
                <Select
                  labelid = 'bowling_select_label'
                  id="gender"
                  variant= "outlined"
                  value = {this.state.bowlingHand}
                  onChange= {(event) => this.setState({bowlingHand: event.target.value})}
                >
                  <MenuItem value= 'Left'>Left</MenuItem>
                  <MenuItem value= 'Right'>Right</MenuItem>
                </Select>
              </FormControl>
          }
          <br/>
          <TextField
            variant = "outlined"
            label = "Initial Price"
            placeholder = "1000"
            style = { styles.textField }
            value = {this.state.price}
            onChange = {(event) => this.setState({price: event.target.value})}
          />
          <br/>
          <TextField
            required
            variant = "outlined"
            label = "Availability"
            placeholder = "28th Feb, 29th Feb, 1st March "
            style = { styles.textField }
            value = {this.state.availability}
            onChange = {(event) => this.setState({availability: event.target.value})}
          />
          <div
            align = 'center'
          >
            <Button
              color = 'default'
              style={styles.button}
              onClick={(event) => this.verifyForm()}
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
    minWidth: '30%'
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

export default PlayerForm;
