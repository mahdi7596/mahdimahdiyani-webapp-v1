// client/src/utils/apiFetch.js

export const apiFetch = async (path, options = {}) => {
  const baseUrl = import.meta.env.DEV
    ? "" // Use proxy during local development
    : import.meta.env.VITE_BACKEND_URL; // Full URL in production

  const response = await fetch(`${baseUrl}${path}`, options);

  // Optional: handle errors globally
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API error: ${response.status} - ${errorText}`);
    throw new Error(`API error: ${response.status}`);
  }

  return response;
};
