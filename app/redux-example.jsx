const redux = require('redux');

console.log('Starting redux example');

let nextHobbyId = 1;
let nextMovieId = 1;

const reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

const composer = redux.compose(window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = redux.createStore(reducer, composer);
const unsubscribe = store.subscribe(subscriber);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Andrew'
});

// unsubscribe();
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Terminator',
  genre: 'Action'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Mad Max',
  genre: 'Action'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emily'
});

function subscriber() {
  const state = store.getState();
  console.log('New state', state);
  document.getElementById('app').innerHTML = state.name;
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
