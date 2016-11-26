const redux = require('redux');

console.log('Starting Todo App');

const stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

const reducer = (state = stateDefault, action) => {
  return state;
};

const store = redux.createStore(reducer);

const currentState = store.getState();

console.log('currentState', currentState);
