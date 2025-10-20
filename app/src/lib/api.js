export async function api(path, init = {}) {
  const token = sessionStorage.getItem("token");
  const headers = new Headers(init.headers || {});
  if (token) headers.set("authorization", `Bearer ${token}`);
  return fetch(path, { ...init, headers });
}