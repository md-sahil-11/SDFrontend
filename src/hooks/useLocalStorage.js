import { useState } from "react";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils/localStorageUtil";

const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      console.log(keyName)
      return getItemFromLocalStorage(keyName, defaultValue);
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    setItemToLocalStorage(keyName, newValue);
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;



