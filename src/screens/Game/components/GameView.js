import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../styles';
import Tiles from './Tiles';
import BottomBar from './BottomBar';
import { pauseDisplayIcon, gameOverIcon, exitIcon } from '../../../static/icons';
import { oneOf, func } from 'prop-types';
import { GAME_STATE } from '../../../constants';
import { Button } from '../../../components'
import i18n from 'i18n-js';


export default function GameView (props) {

  const renderPause = (icon, text) => (
    <View style={styles.pausedContainer}>
      <Image
        source={icon}
        style={styles.pausedIcon}
      />
      <Text style={styles.pausedText}>
        {text}
      </Text>
      <Button
        icon={exitIcon}
        style={styles.exitButton}
        iconStyle={styles.exitIcon}
        onPress={props.onExitPress}
      />
    </View>
  );

  const renderContent = () => {
    switch (props.gameState) {
      case GAME_STATE.INGAME:
        return (
          <Tiles
            size={props.size}
            color={props.color}
            distinctColor={props.distinctColor}
            distinctTile={props.distinctTile}
            onTilePressed={props.onTilePressed}
            loading={props.loading}
          />
        );
      case GAME_STATE.PAUSED:
        return renderPause(pauseDisplayIcon, i18n.t('pauseText'));
      case GAME_STATE.LOST:
        return renderPause(gameOverIcon, i18n.t('gameOverText'));
    }
  }

  return (
    <View style={styles.container}>
      {renderContent()}
      <BottomBar
        points={props.points}
        timeLeft={props.timeLeft}
        bestScore={props.bestScore}
        bestTime={props.bestTime}
        onBottomBarPress={props.onBottomBarPress}
        gameState={props.gameState}
      />
    </View>
  );
}

GameView.propTypes = {
    gameState: oneOf(Object.keys(GAME_STATE).map(key => GAME_STATE[key])),
    onExitPress: func.isRequired,
  ...Tiles.propTypes,
  ...BottomBar.propTypes
}

GameView.defaultProps = {
  ...(Tiles.defaultProps || {}),
  ...(BottomBar.defaultProps || {})
}
