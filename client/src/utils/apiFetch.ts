export const apiFetch = async (path, options = {}) => {
  const baseUrl = import.meta.env.DEV ? "" : import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: "include", // 🔥 This line is important
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API error: ${response.status} - ${errorText}`);
    throw new Error(`API error: ${response.status}`);
  }

  return response;
};
