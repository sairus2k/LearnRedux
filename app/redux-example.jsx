const redux = require('redux');

console.log('Starting redux example');

const defaultState = { name: 'Anonymous' };
const reducer = (state = defaultState, action) => {
  const { type, name } = action;
  const cases = {
    CHANGE_NAME: () => ({
      ...state,
      name
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
  type: 'CHANGE_NAME',
  name: 'Emily'
});

function subscriber() {
  const state = store.getState();
  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;
}
