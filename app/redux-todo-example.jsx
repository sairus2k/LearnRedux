const redux = require('redux');

console.log('Starting Todo App');

const stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};
const reducer = (state = stateDefault, action) => {
  const { type, searchText } = action;
  const switchCase = {
    CHANGE_SEARCH_TEXT: () => ({
      ...state,
      searchText
    }),
    default: () => state
  };
  return (switchCase[type] || switchCase['default'])();
};
const composer = redux.compose(window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = redux.createStore(reducer, composer);
const unsubscribe = store.subscribe(subscriber);

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'work'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'dog'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'something to change'
});

function subscriber() {
  const state = store.getState();
  document.getElementById('app').innerHTML = state.searchText;
}
