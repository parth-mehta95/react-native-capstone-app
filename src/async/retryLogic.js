/**
 * Waits for a specific number of milliseconds.
 *
 * @param {number} ms - Delay time in milliseconds.
 * @returns {Promise<void>} Promise that resolves after the delay.
 */
export const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Calculates exponential backoff delay.
 *
 * @param {number} attempt - Current retry attempt number.
 * @param {number} baseDelay - Base delay in milliseconds.
 * @returns {number} Calculated delay.
 */
export const calculateBackoffDelay = (attempt, baseDelay = 1000) => {
  return baseDelay * 2 ** attempt;
};

/**
 * Retries an async operation using exponential backoff.
 *
 * @param {Function} operation - Async function to retry.
 * @param {Object} options - Retry configuration.
 * @param {number} options.retries - Maximum number of retries.
 * @param {number} options.baseDelay - Base delay in milliseconds.
 * @returns {Promise<any>} Result of successful operation.
 */
export const retry = async (operation, options = {}) => {
  const { retries = 3, baseDelay = 1000 } = options;

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      const delay = calculateBackoffDelay(attempt, baseDelay);
      await wait(delay);
    }
  }

  throw lastError;
};