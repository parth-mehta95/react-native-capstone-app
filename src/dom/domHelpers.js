/**
 * Checks if DOM is available.
 *
 * @returns {boolean} True if document exists.
 */
export const hasDOM = () => {
  return typeof document !== "undefined";
};

/**
 * Selects one DOM element.
 *
 * @param {string} selector - CSS selector.
 * @param {Document|Element|null} root - Root element.
 * @returns {Element|null} Selected element.
 */
export const query = (selector, root = null) => {
  if (!hasDOM()) {
    return null;
  }

  return (root || document).querySelector(selector);
};

/**
 * Selects multiple DOM elements.
 *
 * @param {string} selector - CSS selector.
 * @param {Document|Element|null} root - Root element.
 * @returns {Array<Element>} List of selected elements.
 */
export const queryAll = (selector, root = null) => {
  if (!hasDOM()) {
    return [];
  }

  return Array.from((root || document).querySelectorAll(selector));
};

/**
 * Adds an event listener to an element.
 *
 * @param {Element} element - DOM element.
 * @param {string} eventName - Event name.
 * @param {Function} handler - Event handler function.
 * @returns {Function} Cleanup function.
 */
export const addEvent = (element, eventName, handler) => {
  if (!element) {
    return () => {};
  }

  element.addEventListener(eventName, handler);

  return () => {
    element.removeEventListener(eventName, handler);
  };
};

/**
 * Updates inner HTML of an element.
 *
 * @param {Element} element - DOM element.
 * @param {string} html - HTML content.
 * @returns {void}
 */
export const setHTML = (element, html) => {
  if (element) {
    element.innerHTML = html;
  }
};

/**
 * Updates text content of an element.
 *
 * @param {Element} element - DOM element.
 * @param {string} text - Text content.
 * @returns {void}
 */
export const setText = (element, text) => {
  if (element) {
    element.textContent = text;
  }
};