
// A naive implementation of the redux store that uses a single reducer


const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => {
        return state;
    }
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    dispatch({});
    return {getState, dispatch, subscribe}
}

const store = createStore(counter);
store.dispatch({type: 'INCREMENT'});
console.log(store.getState());


