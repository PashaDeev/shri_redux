export default function createStore(reducer, initialState = {}) {
  if (typeof reducer !== 'function') throw new Error('reducer must be function');

  let state = initialState;
  const currentReducer = reducer;

  const subscribers = [];
  return {
    dispatch(action) {
      state = currentReducer(state, action);

      subscribers.forEach(subscriber => {
        subscriber(state);
      });
    },

    getState: () => state,

    subscribe(cb) {
      subscribers.push(cb);

      return () => {
        const index = subscribers.indexOf(cb);

        if (index >= 0) {
          subscribers.splice(index, 1);
        }
      };
    },
  };
}
