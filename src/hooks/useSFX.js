import { useEffect, useMemo } from 'react';
import { Audio } from 'expo-av';

export default function useSFX (audioFile) {

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
    const { positionMillis } = await soundObject.getStatusAsync();

    await !positionMillis && soundObject.setStatusAsync({ shouldPlay: true });

    return soundObject.replayAsync();
  }
}
