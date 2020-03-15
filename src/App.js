import React, { useState, useEffect } from 'react';
import { AppLoading, registerRootComponent } from 'expo';
import { StatusBar, Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Routes from '@/routes';
import assets from '@/assets';

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const cacheImages = (images) => Promise.all(images.map((image) => (typeof image === 'string'
    ? Image.prefetch(image)
    : Asset.fromModule(image).downloadAsync())));

  const cacheFonts = (fonts) => Promise.all(fonts.map((font) => Font.loadAsync(font)));

  const loadAssetsAsync = () => Promise.all([
    cacheFonts(assets.fonts),
    cacheImages(assets.images),
  ]);

  useEffect(() => {
    loadAssetsAsync()
      .then(() => setAppIsReady(true));
  }, []);

  return !appIsReady ? (
    <AppLoading />
  ) : (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}

export default registerRootComponent(App);
