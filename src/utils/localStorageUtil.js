const getItemFromLocalStorage = (key, defaultValue) => {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
};

const setItemToLocalStorage = (key, value) => {
  try {
    console.log(key, value)
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {console.log(err)}
};

const removeItemFromLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {console.log(err)}
}

const removeAllItemFromLocalStorage = () => window.localStorage.clear()

export { 
  getItemFromLocalStorage, 
  setItemToLocalStorage, 
  removeItemFromLocalStorage,
  removeAllItemFromLocalStorage,
};
