export function saveItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadItem(key) {
  const data = localStorage.getItem(key);

  return data && JSON.parse(data);
}
