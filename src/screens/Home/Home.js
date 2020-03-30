import React, { useState } from 'react';
import copyrights from 'copyrights';
import HomeView from './components/HomeView';

export default function Home({ navigation }) {
  const [hiscore] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const onPlayPress = () => {
    navigation.navigate("Game");
  };

  const onLeaderboardPress = () => {
    console.log('onLeaderboardPress event handler');
  };

  const onToggleSound = () => {
    setSoundOn(!soundOn);
  };

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
