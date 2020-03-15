import React, { useState } from 'react';
import {
  playIcon, leaderboardIcon, speakerOnIcon, speakerOffIcon,
} from '@/assets/icons';
import { View } from 'react-native';
import Header from '@/components/Header';
import Button from '@/components/Button';
import styles from './styles';
import HiScore from './components/HiScore';
import Copyrights from './components/Copyrights';

export default function Home() {
  const [hiscore] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const onPlayPress = () => {
    console.log('onPlayPress event handler');
  };

  const onLeaderboardPress = () => {
    console.log('onLeaderboardPress event handler');
  };

  const onToggleSound = () => {
    setSoundOn(!soundOn);
  };

  return (
    <View style={styles.homeContainer}>
      <Header />
      <Button
        icon={playIcon}
        text="PLAY!"
        onPress={onPlayPress}
        style={styles.playButton}
      />
      <HiScore value={hiscore} />
      <Button
        icon={leaderboardIcon}
        text="Leaderboard"
        onPress={onLeaderboardPress}
        style={styles.leaderboardButton}
        iconSize={45}
      />
      <Copyrights />
      <Button
        icon={soundOn ? speakerOnIcon : speakerOffIcon}
        iconSize={45}
        onPress={onToggleSound}
        style={styles.soundButton}
      />
    </View>
  );
}
