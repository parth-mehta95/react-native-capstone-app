/**
 * Creates a Promise-based state manager.
 *
 * @param {Object} initialState - Initial state object.
 * @returns {Object} State manager methods.
 */
export const createStateManager = (initialState = {}) => {
  let state = { ...initialState };
  const listeners = new Set();
  let updateQueue = Promise.resolve();

  /**
   * Returns current state.
   *
   * @returns {Object} Current state.
   */
  const getState = () => ({ ...state });

  /**
   * Notifies all subscribers.
   *
   * @returns {void}
   */
  const notify = () => {
    listeners.forEach((listener) => listener(getState()));
  };

  /**
   * Subscribes to state changes.
   *
   * @param {Function} listener - Callback function.
   * @returns {Function} Unsubscribe function.
   */
  const subscribe = (listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  /**
   * Updates state using Promise-based queue to avoid race conditions.
   *
   * @param {Object|Function} updater - State object or updater function.
   * @returns {Promise<Object>} Updated state.
   */
  const setState = (updater) => {
    updateQueue = updateQueue.then(async () => {
      const previousState = getState();

      const nextState =
        typeof updater === "function" ? await updater(previousState) : updater;

      state = {
        ...state,
        ...nextState,
      };

      notify();
      return getState();
    });

    return updateQueue;
  };

  /**
   * Resets the full state.
   *
   * @param {Object} newState - New state object.
   * @returns {Promise<Object>} Reset state.
   */
  const resetState = (newState = {}) => {
    updateQueue = updateQueue.then(async () => {
      state = { ...newState };
      notify();
      return getState();
    });

    return updateQueue;
  };

  return {
    getState,
    setState,
    resetState,
    subscribe,
  };
};