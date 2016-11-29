const axios = require('axios');

export const changeName = name => ({
  type: 'CHANGE_NAME',
  name
});
export const addHobby = hobby => ({
  type: 'ADD_HOBBY',
  hobby
});
export const removeHobby = id => ({
  type: 'REMOVE_HOBBY',
  id
});
export const addMovie = (title, genre) => ({
  type: 'ADD_MOVIE',
  title,
  genre
});
export const removeMovie = id => ({
  type: 'REMOVE_MOVIE',
  id
});
export const startLocationFetch = () => ({
  type: 'START_LOCATION_FETCH'
});
export const completeLocationFetch = url => ({
  type: 'COMPLETE_LOCATION_FETCH',
  url
});

export const fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());
    axios.get('http://ipinfo.io').then(res => {
      const loc = res.data.loc;
      const baseUrl = 'http://maps.google.com?q=';
      dispatch(completeLocationFetch(baseUrl + loc));
    })
  }
};
