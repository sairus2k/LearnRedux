
let nextHobbyId = 1;
let nextMovieId = 1;

export function nameReducer(state = 'Anonymous', action) {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
}

export function hobbiesReducer(state = [], action) {
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

export function moviesReducer(state = [], action) {
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

export function mapReducer(state = { isFetching: false, url: null }, action) {
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
