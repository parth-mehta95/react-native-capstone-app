/**
 * Creates a debounce function.
 *
 * @param {Function} callback - Function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {Function} Debounced function.
 */
export const debounce = (callback, delay = 300) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

/**
 * Creates a throttle function.
 *
 * @param {Function} callback - Function to throttle.
 * @param {number} limit - Time limit in milliseconds.
 * @returns {Function} Throttled function.
 */
export const throttle = (callback, limit = 300) => {
  let isWaiting = false;

  return (...args) => {
    if (!isWaiting) {
      callback(...args);
      isWaiting = true;

      setTimeout(() => {
        isWaiting = false;
      }, limit);
    }
  };
};

/**
 * Creates a simple observable-like value container.
 *
 * @param {*} initialValue - Initial value.
 * @returns {Object} Observable methods.
 */
export const createObservable = (initialValue) => {
  let value = initialValue;
  const subscribers = new Set();

  /**
   * Gets current value.
   *
   * @returns {*} Current value.
   */
  const getValue = () => value;

  /**
   * Updates value and notifies subscribers.
   *
   * @param {*} newValue - New value.
   * @returns {void}
   */
  const setValue = (newValue) => {
    value = newValue;
    subscribers.forEach((subscriber) => subscriber(value));
  };

  /**
   * Subscribes to value changes.
   *
   * @param {Function} subscriber - Subscriber callback.
   * @returns {Function} Unsubscribe function.
   */
  const subscribe = (subscriber) => {
    subscribers.add(subscriber);

    return () => {
      subscribers.delete(subscriber);
    };
  };

  return {
    getValue,
    setValue,
    subscribe,
  };
};