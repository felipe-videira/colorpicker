import { AsyncStorage } from 'react-native';

const PREFIX = '@rngame';

export const get = async key => {
  return JSON.parse(await AsyncStorage.getItem(`${PREFIX}:${key}`));
};

export const set = (key, value) => {
  return AsyncStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
}

export const remove = key => {
  return AsyncStorage.removeItem(`${PREFIX}:${key}`);
}

export const exists = async key => {
  return (await AsyncStorage.getItem(`${PREFIX}:${key}`)) !== null;
};

