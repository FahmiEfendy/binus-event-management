export function setToken(value) {
  localStorage.setItem("BEM_TOKEN", value);
}

export function getToken() {
  return localStorage.getItem("BEM_TOKEN") || "";
}

export function setMahasiswaId(value) {
  localStorage.setItem("MAHASISWA_ID", value);
}

export function getMahasiswaId() {
  return localStorage.getItem("MAHASISWA_ID" || "");
}

export function setPenyelenggaraId(value) {
  localStorage.setItem("PENYELENGGARA_ID", value);
}

export function getPenyelenggaraId() {
  return localStorage.getItem("PENYELENGGARA_ID" || "");
}

export function clearStorage() {
  localStorage.clear();
}
