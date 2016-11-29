const redux = require('redux');

console.log('Starting redux example');

const defaultState = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};
let nextHobbyId = 1;
let nextMovieId = 1;
const reducer = (state = defaultState, action) => {
  const { type, name, hobby, title, genre, id } = action;
  const cases = {
    CHANGE_NAME: () => ({
      ...state,
      name
    }),
    ADD_HOBBY: () => ({
      ...state,
      hobbies: [
        ...state.hobbies,
        {
          id: nextHobbyId++,
          hobby
        }
      ]
    }),
    REMOVE_HOBBY: () => ({
      ...state,
      hobbies: state.hobbies.filter(item => item.id !== id)
    }),
    ADD_MOVIE: () => ({
      ...state,
      movies: [
        ...state.movies,
        {
          id: nextMovieId++,
          title,
          genre
        }
      ]
    }),
    REMOVE_MOVIE: () => ({
      ...state,
      movies: state.movies.filter(item => item.id !== id)
    }),
    default: () => state
  };
  return (cases[type] || cases['default'])();
};

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
