/**
 * Checks if a value is not empty.
 *
 * @param {string} value - Input value.
 * @returns {boolean} True if value is not empty.
 */
export const isRequired = (value) => {
  return value !== undefined && value !== null && value.toString().trim() !== "";
};

/**
 * Validates an email address.
 *
 * @param {string} email - Email address.
 * @returns {boolean} True if email is valid.
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password length.
 *
 * @param {string} password - Password value.
 * @returns {boolean} True if password has at least 8 characters.
 */
export const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 8;
};

/**
 * Validates user form data.
 *
 * @param {Object} user - User form data.
 * @param {string} user.name - User name.
 * @param {string} user.email - User email.
 * @param {string} user.password - User password.
 * @returns {Object} Validation result.
 */
export const validateUserForm = ({ name, email, password }) => {
  const errors = {};

  if (!isRequired(name)) {
    errors.name = "Name is required";
  }

  if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!isValidPassword(password)) {
    errors.password = "Password must be at least 8 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};