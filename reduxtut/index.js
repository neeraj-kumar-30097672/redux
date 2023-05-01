// Basics of Redux + multiple reducers + middlleware

const redux = require('redux')

//middleware
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

//action constants
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

//action functions
function orderCake(qty=1) {
    return {
        type: CAKE_ORDERED,
        payload: qty,
    }
}
function restockCake(qty=1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}
function orderIcecream(qty=1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}
function restockIcecream(qty=1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

//initialstates
const initialCakeState = { 
    numOfCakes: 10
}
const initialIceCreamState = {
    numOfIcecream: 20
}

//reducers
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}
const icecreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream - action.payload
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream + action.payload
            }
        default:
            return state
    }
}

// combining multiple reducers
const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

//creating store
// const store =  redux.legacy_createStore(rootReducer)
const store =  redux.legacy_createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State: ', store.getState())

//listener
const unsubscribe = store.subscribe(() => 
    console.log('Updated State: ', store.getState())
)

//dispatch actions
store.dispatch(orderCake(2))
store.dispatch(restockCake(2))
store.dispatch(orderIcecream(2))
store.dispatch(restockIcecream(2))

//action bind
// const actions = redux.bindActionCreators({orderCake, restockCake}, store.dispatch)
// actions.orderCake(2)
// actions.restockCake(3)

unsubscribe()