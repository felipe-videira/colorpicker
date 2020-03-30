import React, { useState, useEffect } from 'react';
import copyrights from 'copyrights';
import HomeView from './components/HomeView';
import { homeSoundtrack } from '../../static/music';
import { buttonTap } from '../../static/sfx';
import useMusic from '../../hooks/useMusic';
import useSFX from '../../hooks/useSFX';
import useStateWithGetter from '../../hooks/useStateWithGetter';
import * as storage from '../../services/storage';

export default function Home({ navigation }) {

  const [hiscore] = useState(0);
  const [soundOn, setSoundOn, getSoundOn] = useStateWithGetter(true);

  const initMusic = async (play, stop) => {
    const storedSoundOn = await storage.get('soundOn');

    if (storedSoundOn !== null) {
      setSoundOn(storedSoundOn);

      !storedSoundOn && stop();
    }
  }

  const [playMusic, stopMusic] = useMusic(homeSoundtrack, initMusic);
  const playButtonTap = useSFX(buttonTap);

  const onPlayPress = async () => {
    await playButtonTap();
    await stopMusic();

    navigation.navigate("Game");
  };

  const onLeaderboardPress = () => {
    console.log('onLeaderboardPress event handler');
  };

  const onToggleSound = async () => {
    await (soundOn ? stopMusic() : playMusic());
    const newSoundOn = !soundOn
    await storage.set('soundOn', newSoundOn);
    setSoundOn(newSoundOn);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSoundOn(soundOn => {
        soundOn ? playMusic() : stopMusic();
      })
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <HomeView
      onPlayPress={onPlayPress}
      onToggleSound={onToggleSound}
      onLeaderboardPress={onLeaderboardPress}
      hiscore={hiscore}
      soundOn={soundOn}
      copyrights={copyrights}
    />
  );
}
