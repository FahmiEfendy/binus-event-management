export function setToken(value) {
  localStorage.setItem("USER_TOKEN", value);
}

export function getToken() {
  return localStorage.getItem("USER_TOKEN") || "";
}

export function setMahasiswaId(value) {
  localStorage.setItem("MAHASISWA_ID", value);
}

export function getMahasiswaId() {
  return localStorage.getItem("MAHASISWA_ID" || "");
}

export function clearStorage() {
  localStorage.clear();
}
