import { useEffect, useMemo } from 'react';
import { Audio } from 'expo-av';
import useUserSettings from './useUserSettings';

export default function useMusic (audioFile) {

  const { soundOn } = useUserSettings();
  const soundObject = useMemo(() => new Audio.Sound(), []);

  const play = async () => {
    const { isLoaded } = await soundObject.getStatusAsync();

    if (!isLoaded) return;

    return soundOn && soundObject.playAsync();
  }

  const stop = async () => {
    const { isLoaded } = await soundObject.getStatusAsync();

    if (!isLoaded) return;

    return soundObject.stopAsync();
  }

  const pause = async () => {
    const { isLoaded } = await soundObject.getStatusAsync();

    if (!isLoaded) return;

    return soundObject.pauseAsync();
  }

  useEffect(() => {
    soundOn ? play() : stop();
  }, [soundOn]);

  useEffect(() => {
    const initAsync = async () => {
      try {
        await soundObject.loadAsync(audioFile);
        await soundObject.setIsLoopingAsync(true);

        soundOn && play();
      } catch (error) {
        console.log(error);
      }
    }

    initAsync();

    return () => {
      soundObject.unloadAsync();
    }
  }, []);

  return [play, stop, pause];
}
