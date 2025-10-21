export const tokenStore = {
  save(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },
  get() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || sessionStorage.getItem("token");
    }
    return null;
  },
  clear() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
  }
};