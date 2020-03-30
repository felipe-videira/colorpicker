import React from 'react';
import styles from '../styles/bottomBar';
import i18n from 'i18n-js';
import {
  scoreIcon,
  timerIcon,
  pauseIcon,
  playIcon,
  replayIcon
} from '../../../static/icons';
import { Button } from '../../../components';
import { View, Text, Image } from 'react-native';
import { func, number, oneOf } from 'prop-types';
import { GAME_STATE } from '../../../constants';

export default function BottomBar ({
  gameState,
  points,
  timeLeft,
  bestScore,
  bestTime,
  onBottomBarPress,
}) {

  const renderSection = (
    counterCount,
    counterLabel,
    bestLabel,
    bestIcon
  ) => {
    return (
      <View style={styles.bottomSectionContainer}>
        <Text style={styles.counterCount}>
          {counterCount}
        </Text>
        <Text style={styles.counterLabel}>
          {counterLabel}
        </Text>
        <View style={styles.bestContainer}>
          <Image source={bestIcon} style={styles.bestIcon} />
            <Text style={styles.bestLabel}>{bestLabel}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.bottomContainer}>
      {renderSection(points, i18n.t('pointsLabel'), bestScore, scoreIcon)}
      <View style={styles.bottomSectionContainer}>
        <Button
          icon={gameState === GAME_STATE.INGAME
            ? pauseIcon
            : gameState === GAME_STATE.PAUSED
              ? playIcon
              : replayIcon}
          onPress={onBottomBarPress}
        />
      </View>
      {renderSection(timeLeft, i18n.t('timeLeftLabel'), bestTime, timerIcon)}
    </View>
  );
}

BottomBar.propTypes = {
  gameState: oneOf(Object.keys(GAME_STATE).map(key => GAME_STATE[key])),
  points: number.isRequired,
  timeLeft: number.isRequired,
  bestScore: number.isRequired,
  bestTime: number.isRequired,
  onBottomBarPress: func.isRequired,
}
