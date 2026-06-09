/**
 * Creates a simple event emitter using subscribe/publish pattern.
 *
 * @returns {Object} Event emitter methods.
 */
export const createEventEmitter = () => {
  const events = new Map();

  /**
   * Subscribes to an event.
   *
   * @param {string} eventName - Event name.
   * @param {Function} callback - Callback function.
   * @returns {Function} Unsubscribe function.
   */
  const subscribe = (eventName, callback) => {
    if (!events.has(eventName)) {
      events.set(eventName, new Set());
    }

    events.get(eventName).add(callback);

    return () => {
      events.get(eventName).delete(callback);
    };
  };

  /**
   * Publishes an event to all subscribers.
   *
   * @param {string} eventName - Event name.
   * @param {*} data - Event payload.
   * @returns {Promise<Array>} Listener results.
   */
  const publish = async (eventName, data) => {
    const listeners = events.get(eventName);

    if (!listeners) {
      return [];
    }

    return Promise.all(
      Array.from(listeners).map((listener) => listener(data))
    );
  };

  /**
   * Removes all listeners for an event.
   *
   * @param {string} eventName - Event name.
   * @returns {void}
   */
  const clear = (eventName) => {
    events.delete(eventName);
  };

  return {
    subscribe,
    publish,
    clear,
  };
};