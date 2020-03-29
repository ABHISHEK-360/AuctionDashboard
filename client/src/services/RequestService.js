//abhishek360

import axios from 'axios';
import * as Constants from '../configs/Constants'

export default class RequestService {
  constructor(route = '', domain = '') {
    let uri = process.env.REACT_APP_ADMIN_HOST || '';
    switch (domain) {
      case Constants.ADMIN:
        uri = process.env.REACT_APP_ADMIN_HOST || '';
        this.url = `${uri}/api/${route}`;
        break;

      default:
        uri = process.env.REACT_APP_ADMIN_HOST || '';
        this.url = `${uri}/api/${route}`;
    }

    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  post = async (data, id = '', token, headers = axios.defaults.headers) => {
    if (token) {
      axios.defaults.headers['xyz-access-token'] = token;
      try {
        const res = await axios({ method: 'POST',  url: `${this.url}/${id}`, data, headers });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    }
    return {
      success: 'false',
      status: 'unauthorized',
      message: 'Token not found, Login and try again.',
    };
  };

  put = async (data, id = '', token, headers = axios.defaults.headers) => {
    if (token) {
      axios.defaults.headers['xyz-access-token'] = token;
      try {
        const res = await axios({ method: 'PUT',  url: `${this.url}/${id}`, data, headers  });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    }
    else{
      try {
        const res = await axios({ method: 'PUT',  url: `${this.url}/${id}`, data, headers });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    }
  };

  get = async (id = '', token) => {
    if (token) {
      axios.defaults.headers['xyz-access-token'] = token;
      try {
        const res = await axios({ methods: 'GET', url: `${this.url}/${id}` });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    }
    else{
      try {
        const res = await axios({ methods: 'GET', url: `${this.url}/${id}` });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    }
  };

  auth = async(username, password) => {
    try {
      const res = await axios({ method: 'POST', url: `${this.url}/login`, data : { username, password } });
      return res.data;
    } catch (error) {
      console.log('login erorrrrrrrr', error);
      return{
        success: false,
        ...error.response,
      }
    }
  }
}
