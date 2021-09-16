const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const MAKE_CAKE = "MAKE_CAKE";

const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}
function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "buy icecream action",
  };
}
function makeCake() {
  return {
    type: MAKE_CAKE,
    info: "make a cake",
  };
}

const initialCakeState = {
  noOfCakes: 10,
};

const initialIceCreamState = {
  noOFIceCream: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };

    case MAKE_CAKE:
      return {
        ...state,
        noOfCakes: state.noOfCakes + 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        noOFIceCream: state.noOFIceCream - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("inital state", store.getState());
const unsubsribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(makeCake());

store.dispatch(makeCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubsribe();
