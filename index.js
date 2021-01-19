const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake() {
  // this is an action creater (the action itself is the object with the 'type' property inside it)
  // If this action is used multiple times in an application, the action creator means any changes only need to be made once and it will be updated throughout the app
  return {
    type: BUY_CAKE,
    info: 'First redux action',
  };
}

function buyIceCream() {
  // this is an action creater (the action itself is the object with the 'type' property inside it)
  // If this action is used multiple times in an application, the action creator means any changes only need to be made once and it will be updated throughout the app
  return {
    type: BUY_ICECREAM,
    info: 'Second redux action',
  };
}

// (previousState, action) => newState // the shape of a reducer, it requires 2 x parameters

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state, // there may be multiple state properties, so better to make a copy first and only change those properties that you need to change
//         numOfCakes: state.numOfCakes - 1,
//       }; // not mutating the state object, are returning a new object
//     case BUY_ICECREAM:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - 1,
//       };
//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const IceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: IceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger)); // Can pass in as many middlewares as your application requires
console.log('initial state', store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
