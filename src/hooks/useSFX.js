import { useEffect, useMemo } from 'react';
import { Audio } from 'expo-av';
import useUserSettings from './useUserSettings';

export default function useSFX (audioFile) {

  const { soundOn } = useUserSettings();
  const soundObject = useMemo(() => new Audio.Sound(), []);

  useEffect(() => {
    const initAsync = async () => {
      try {
        await soundObject.loadAsync(audioFile);
      } catch (error) {
        console.log(error);
      }
    }

    initAsync();

    return () => {
      soundObject.unloadAsync();
    }
  }, []);

  return async function play () {
    if (!soundOn) return;

    const { positionMillis, isLoaded } = await soundObject.getStatusAsync();

    if (!isLoaded) return;

    await !positionMillis && soundObject.setStatusAsync({ shouldPlay: true });

    return soundObject.replayAsync();
  }
}
