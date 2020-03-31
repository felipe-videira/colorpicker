import React, { useState, useEffect } from 'react';
import copyrights from 'copyrights';
import HomeView from './components/HomeView';
import { homeSoundtrack } from '../../static/music';
import { buttonTapSound } from '../../static/sfx';
import useMusic from '../../hooks/useMusic';
import useSFX from '../../hooks/useSFX';
import useUserSettings from '../../hooks/useUserSettings';
import * as storage from '../../services/storage';


export default function Home({ navigation }) {

  const [hiscore] = useState(0);

  const { soundOn, onToggleSound } = useUserSettings();

  const [playMusic, stopMusic] = useMusic(homeSoundtrack);

  const playButtonTapSound = useSFX(buttonTapSound);


  const onPlayPress = async () => {
    playButtonTapSound();
    stopMusic();

    navigation.navigate("Game");
  };

  const onSoundToggled = () => {
    onToggleSound(!soundOn);
  };


  //TODO: find a better solution for this
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const soundOn = await storage.get('soundOn');
      soundOn ? playMusic() : stopMusic();
    });

    return unsubscribe;
  }, [navigation]);


  return (
    <HomeView
      onPlayPress={onPlayPress}
      onToggleSound={onSoundToggled}
      hiscore={hiscore}
      soundOn={soundOn}
      copyrights={copyrights}
    />
  );
}
