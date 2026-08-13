const DEFAULT_API_URL = "https://kanbas-node-server-app-0qse.onrender.com";

export const REMOTE_SERVER = (
  import.meta.env.VITE_REMOTE_SERVER || DEFAULT_API_URL
).replace(/\/$/, "");
