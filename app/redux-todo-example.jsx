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
const store = redux.createStore(reducer);
console.log('currentState', store.getState());

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'work'
});

console.log('Search text should be work', store.getState());
