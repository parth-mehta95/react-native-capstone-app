/**
 * Formats a date into a readable format.
 *
 * @param {Date|string|number} date - The date to format.
 * @param {string} locale - Locale for formatting.
 * @returns {string} Formatted date string.
 */
export const formatDate = (date, locale = "en-US") => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Adds days to a given date.
 *
 * @param {Date|string|number} date - Original date.
 * @param {number} days - Number of days to add.
 * @returns {Date} New date after adding days.
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Gets the current year.
 *
 * @returns {number} Current year.
 */
export const getCurrentYear = () => new Date().getFullYear();