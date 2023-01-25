export function setToken(value) {
  localStorage.setItem("USER_TOKEN", value);
}

export function getToken() {
  return localStorage.getItem("USER_TOKEN") || "";
}

export function clearStorage() {
  localStorage.clear();
}
