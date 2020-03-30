import './i18n';
import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { AppLoading, registerRootComponent } from 'expo';
import { StatusBar, Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Routes from './routes';
import * as staticAssets from './static';
import { UserSettingsProvider } from "./providers/userSettingsProvider";
import * as storage from './services/storage';
import {
  userSettingsReducer,
  USER_SETTINGS_TYPES
} from './reducers/userSettingsReducer';

function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  const [
    userSettingsState,
    userSettingsDispatch
  ] = useReducer(userSettingsReducer, {
    soundOn: true
  })

  const userSettingsActions = useMemo(() => ({
    onToggleSound: async soundOn => {
      if (typeof soundOn !== 'boolean') {
        throw Error("soundOn must be a boolean value!");
      }
      await storage.set('soundOn', soundOn);

      userSettingsDispatch({
        type: USER_SETTINGS_TYPES.TOGGLE_SOUND,
        payload: soundOn
      });
    },
  }), []);

  const userSettingsContext = useMemo(() => ({
    ...userSettingsState,
    ...userSettingsActions
  }), [userSettingsState])

  const cacheImages = images => {
    return Promise.all(images.map(image =>
      typeof image === 'string'
        ? Image.prefetch(image)
        : Asset.fromModule(image).downloadAsync()
    ));
  }

  const cacheFonts = fonts => {
    return Promise.all(fonts.map(font => Font.loadAsync(font)));
  }

  const loadAssetsAsync = () => {
    return Promise.all([
      cacheFonts(staticAssets.fonts),
      cacheImages(staticAssets.images),
    ]);
  }

  const loadUserSettingsAsync = async () => {
    try {
      const soundOn = await storage.get('soundOn');

      if (soundOn !== null) {
        userSettingsDispatch({
          type: USER_SETTINGS_TYPES.TOGGLE_SOUND,
          payload: soundOn
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const bootstrapAsync = async () => {
      await loadAssetsAsync();

      await loadUserSettingsAsync();

      setAppIsReady(true)
    }

    bootstrapAsync();
  }, []);

  return !appIsReady ? (
    <AppLoading />
  ) : (
    <UserSettingsProvider value={userSettingsContext}>
      <StatusBar barStyle="light-content" />
      <Routes />
    </UserSettingsProvider>
  );
}

export default registerRootComponent(App);
