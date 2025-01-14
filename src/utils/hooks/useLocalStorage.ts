import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T | ((prevValue: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return defaultValue;
    return JSON.parse(storedValue);
  });

  const setLocalStorageValue = (newValue: T | ((prevValue: T) => T)) => {
    setValue((prev) => {
      const valueToStore =
        typeof newValue === 'function' ? (newValue as (prevValue: T) => T)(prev) : newValue;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [value, setLocalStorageValue];
}
