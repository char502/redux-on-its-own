const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Actions
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload, // property sending through using the action creator
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload, // if successful the payload is the array of users, if it fails the payload is the error message
      };
    default:
      return state;
  }
};

// the thunkMiddleware enables the ability for an action creator to return a *** FUNCTION *** instead of an action object
// It also doesn't have to be pure *** so it is allowed to have side effects such as async API calls ***
// This function can also dispatch actions such as the ones above as it receives the dispatch method as it's argument
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        //response.data is the array of users
        const users = response.data.map(user => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        // error.message (description of the error)
        // console.log(error.message);
        // dispatch(fetchUsersFailure(error));
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
