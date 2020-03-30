
import React from 'react';
import { View } from 'react-native';
import { Button, Header } from '../../../components';
import HiScore from './HiScore';
import Copyrights from './Copyrights';
import styles from '../styles';
import i18n from 'i18n-js';
import { func, bool } from 'prop-types';
import {
  playArrowIcon,
  leaderboardIcon,
  speakerOnIcon,
  speakerOffIcon,
} from '../../../static/icons';

export default function HomeView ({
  onPlayPress,
  onToggleSound,
  onLeaderboardPress,
  hiscore,
  soundOn,
  copyrights
}) {
  return (
    <View style={styles.homeContainer}>
      <Header />
      <Button
        icon={playArrowIcon}
        text={i18n.t('playBtnText')}
        onPress={onPlayPress}
        style={styles.playButton}
      />
      <HiScore value={hiscore} />
      <Button
        icon={leaderboardIcon}
        text={i18n.t('leaderboardBtnText')}
        onPress={onLeaderboardPress}
        style={styles.leaderboardButton}
        iconSize={45}
      />
      <Copyrights data={copyrights} />
      <Button
        icon={soundOn ? speakerOnIcon : speakerOffIcon}
        iconSize={45}
        onPress={onToggleSound}
        style={styles.soundButton}
      />
    </View>
  );
}

HomeView.propTypes = {
  soundOn: bool,
  onPlayPress: func.isRequired,
  onToggleSound: func.isRequired,
  onLeaderboardPress: func.isRequired,
  hiscore: HiScore.propTypes.value,
  copyrights: Copyrights.propTypes.data
}

HomeView.defaultProps = {
  hiscore: HiScore.defaultProps.value,
  soundOn: false
}
