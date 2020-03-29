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

class UserForm extends Component {
  state= {
    id: '',
    name: '',
    phone: '',
    email: '',
    role: '',
    password: '',
    confPass: '',
  }

  verifyForm = () => {
    const { name, phone, email, role, password, confPass } = this.state;
    if(name===''){
      alert('User Name is Required!');
      return;
    }
    else if(phone===''){
      alert('Phone No is Required!');
      return;
    }
    else if(email===''){
      alert('Email is Required!');
      return;
    }
    else if(role===''){
      alert('Admin Role is Required!');
      return;
    }
    else if(password===''){
      alert('Password is Required!');
      return;
    }
    else if(password!==confPass){
      alert('Password did not match!');
      return;
    }
    else{
      this.props.handleAddUser({
        name,
        phone,
        email,
        role,
        password
      });
    }
  }

  verifyEdit = () => {
    const { id, name, phone, email, role } = this.state;
    if(name===''){
      alert('User Name is Required!');
      return;
    }
    else if(phone===''){
      alert('Phone No is Required!');
      return;
    }
    else if(email===''){
      alert('Email is Required!');
      return;
    }
    else if(role===''){
      alert('Admin Role is Required!');
      return;
    }
    else{
      this.props.handleEditRequest({
        id,
        name,
        phone,
        email,
        role,
      });
    }
  }

  setDetails = (data) => {
    this.setState({
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: data.role,
    })
  }

  clearFields = () => {
    this.setState({
      id: '',
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      confPass: '',
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
              style = { styles.textField }
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
          <FormControl
            variant="outlined"
            style = { styles.textField }
            required
          >
            <InputLabel id= 'role_select_label'>Role</InputLabel>
            <Select
              labelid = 'role_select_label'
              id="admin_role"
              variant= "outlined"
              value = {this.state.role}
              onChange= {(event) => this.setState({role: event.target.value})}
            >
              <MenuItem value= 'admin'>Admin</MenuItem>
              <MenuItem value= 'captain'>Captain</MenuItem>
              <MenuItem value= 'member'>Member</MenuItem>
            </Select>
          </FormControl>
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
            label = "Email"
            placeholder = "8234567890"
            style = { styles.textField }
            value = {this.state.email}
            onChange = {(event) => this.setState({email: event.target.value})}
          />
          <br/>
          <TextField
            required
            variant = "outlined"
            label = "Password:"
            style = { styles.textField }
            value = {this.state.password}
            onChange = {(event) => this.setState({password: event.target.value})}
          />
          <TextField
            required
            variant = "outlined"
            label = "Conform Password"
            style = { styles.textField }
            value = {this.state.confPass}
            onChange = {(event) => this.setState({confPass: event.target.value})}
          />
          <div
            align = 'center'
          >
            <Button
              color = 'default'
              style = {styles.button}
              onClick = {(event) => {
                if(mode === 'edit')
                  this.verifyEdit();
                else
                  this.verifyForm()
              }}
            >
             {mode==='edit'? 'Update' : 'Save'}
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

export default UserForm;
