import { retry } from "./retryLogic";

/**
 * Creates an AbortController for request timeout.
 *
 * @param {number} timeout - Timeout in milliseconds.
 * @returns {Object} Controller and timeout ID.
 */
export const createTimeoutController = (timeout = 5000) => {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  return { controller, timeoutId };
};

/**
 * Reusable fetch wrapper with timeout, error handling, and retry support.
 *
 * @param {string} url - API URL.
 * @param {Object} options - Fetch options.
 * @param {number} options.timeout - Request timeout in milliseconds.
 * @param {number} options.retries - Number of retry attempts.
 * @param {number} options.retryDelay - Base retry delay.
 * @returns {Promise<any>} API response data.
 */
export const asyncFetch = async (url, options = {}) => {
  const {
    timeout = 5000,
    retries = 0,
    retryDelay = 1000,
    headers = {},
    ...fetchOptions
  } = options;

  const request = async () => {
    const { controller, timeoutId } = createTimeoutController(timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers?.get("content-type") || "";

      if (contentType.includes("application/json")) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      throw error;
    }
  };

  return retry(request, {
    retries,
    baseDelay: retryDelay,
  });
};

/**
 * Sends a GET request.
 *
 * @param {string} url - API URL.
 * @param {Object} options - Additional options.
 * @returns {Promise<any>} API response data.
 */
export const getJSON = async (url, options = {}) => {
  return asyncFetch(url, {
    ...options,
    method: "GET",
  });
};

/**
 * Sends a POST request with JSON body.
 *
 * @param {string} url - API URL.
 * @param {Object} data - Request body data.
 * @param {Object} options - Additional options.
 * @returns {Promise<any>} API response data.
 */
export const postJSON = async (url, data, options = {}) => {
  return asyncFetch(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
};