const BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Converts an object into a query string.
 *
 * @param {Object} params - Query parameters.
 * @returns {string} Query string.
 */
export const buildQueryString = (params = {}) => {
  return new URLSearchParams(params).toString();
};

/**
 * Fetches posts from sample API using async/await.
 *
 * @param {number} limit - Number of posts to fetch.
 * @returns {Promise<Array>} List of posts.
 */
export const fetchPosts = async (limit = 5) => {
  try {
    const query = buildQueryString({ _limit: limit });
    const response = await fetch(`${BASE_URL}/posts?${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

/**
 * Creates a new post using async/await.
 *
 * @param {Object} postData - New post data.
 * @param {string} postData.title - Post title.
 * @param {string} postData.body - Post body.
 * @param {number} postData.userId - User ID.
 * @returns {Promise<Object>} Created post.
 */
export const createPost = async (postData) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};