import axios from 'axios';
import cookies from 'js-cookie';

export const setFavorite = payload => ({
  type: 'SET_FAVORITE',
  payload,
});

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = payload => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const registerRequest = payload => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const deteleFavorite = payload => ({
  type: 'DELETE_FAVORITE',
  payload,
});

export const getVideoSource = payload => ({
  type: 'GET_VIDEO_SOURCE',
  payload,
});

export const getCars = payload => ({
  type: 'GET_CARS',
  payload,
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload,
});

export const setLocation = payload => ({
  type: 'SET_LOCATION',
  payload,
});


export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirectUrl
      })
      .catch(error => dispatch(setError(error)))
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in/',
      method: 'post',
      auth: {
        username: email,
        password
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch(err => dispatch(setError(err)));
  }
};

export const sendLocation = (latitude,longitude,id) => {

const bodyParameters = {
   lat: latitude,
   lng: longitude
};

const config = {
  headers: {
    Authorization: `Bearer ${cookies.get('token')}`,
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  }  
};

  return (dispatch) => {
    axios.put(`https://cars-api.vercel.app/api/cars/${id}`, bodyParameters, config)
      .catch(error => dispatch(setLocation(error)))
  };
};

export const obtainCars = () => {
  return (dispatch) => {
    axios({
      url: `https://cars-api.vercel.app/api/cars`,
      headers: { Authorization: `Bearer ${cookies.get('token')}` },
      method: 'get'
    })
    .catch(error => dispatch(getCars(error)));
  };

} 

export { setFavorite as default }