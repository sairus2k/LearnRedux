const redux = require('redux');
const axios = require('axios');

let nextHobbyId = 1;
let nextMovieId = 1;

const reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

const composer = redux.compose(window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = redux.createStore(reducer, composer);
const unsubscribe = store.subscribe(subscriber);

const changeName = name => ({
  type: 'CHANGE_NAME',
  name
});
const addHobby = hobby => ({
  type: 'ADD_HOBBY',
  hobby
});
const removeHobby = id => ({
  type: 'REMOVE_HOBBY',
  id
});
const addMovie = (title, genre) => ({
  type: 'ADD_MOVIE',
  title,
  genre
});
const removeMovie = id => ({
  type: 'REMOVE_MOVIE',
  id
});
const startLocationFetch = () => ({
  type: 'START_LOCATION_FETCH'
});
const completeLocationFetch = url => ({
  type: 'COMPLETE_LOCATION_FETCH',
  url
});

const fetchLocation = () => {
  store.dispatch(startLocationFetch());
  axios.get('http://ipinfo.io').then(res => {
    const loc = res.data.loc;
    const baseUrl = 'http://maps.google.com?q=';
    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
};
fetchLocation();
store.dispatch(changeName('Andrew'));
store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));
store.dispatch(addMovie('Terminator', 'Action'));
store.dispatch(addMovie('Mad Max', 'Action'));
store.dispatch(removeMovie(1));
store.dispatch(changeName('Emily'));

function subscriber() {
  const state = store.getState();
  console.log('New state', state);
  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = `<a href="${state.map.url}" target="_blank">View Your Location</a>`;
  }
}

function nameReducer(state = 'Anonymous', action) {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
}

function hobbiesReducer(state = [], action) {
  const { id, hobby } = action;
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter(hobby => hobby.id !== id);
    default:
      return state;
  }
}

function moviesReducer(state = [], action) {
  const { id, title, genre } = action;
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title,
          genre
        }
      ];
    case 'remove_movie':
      return state.filter(movie => movie.id !== id);
    default:
      return state;
  }
}

function mapReducer(state = { isFetching: false, url: null }, action) {
  const { url } = action;
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: null
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url
      };
    default:
      return state;
  }
}
