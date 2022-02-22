function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const _storeData = (key, value) => {
  let data = typeof value == "object" ? JSON.stringify(value) : value;
  return window.localStorage.setItem(key, data);
};

export const _retrieveData = (key) => {
  const value = window.localStorage.getItem(key);
  if (value !== null) {
    if (IsJsonString(value)) return JSON.parse(value);
    else return value;
  }
  return null;
};

export const _clearData = (key) => {
  return window.localStorage.removeItem(key);
};
