const saveToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export const tokenStore = {
  save: saveToken,
  get: getToken,
  remove: removeToken,
};