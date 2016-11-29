const redux = require('redux');

const store = require('store/configureStore').configure();
const actions = require('actions/index');
const unsubscribe = store.subscribe(subscriber);

store.dispatch(actions.changeName('Andrew'));
store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.addHobby('Walking'));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.addMovie('Terminator', 'Action'));
store.dispatch(actions.addMovie('Mad Max', 'Action'));
store.dispatch(actions.removeMovie(1));
store.dispatch(actions.changeName('Emily'));

store.dispatch(actions.fetchLocation());

function subscriber() {
  const state = store.getState();
  console.log('New state', state);
  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = `<a href="${state.map.url}" target="_blank">View Your Location</a>`;
  }
}
