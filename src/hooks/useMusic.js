import { useEffect, useMemo } from 'react';
import { Audio } from 'expo-av';

export default function useMusic (audioFile, afterLoadCallback) {

  const soundObject = useMemo(() => new Audio.Sound(), []);

  const play = () => {
    return soundObject.playAsync();
  }

  const stop = () => {
    return soundObject.stopAsync();
  }

  useEffect(() => {
    const initAsync = async () => {
      try {
        await soundObject.loadAsync(audioFile);
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
        afterLoadCallback && afterLoadCallback(play, stop);
      } catch (error) {
        console.log(error);
      }
    }

    initAsync();

    return () => {
      soundObject.unloadAsync();
    }
  }, []);

  return [play, stop];
}
