import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { generateRGB, mutateRGB, randomInt } from '../../utils';
import gameConfig from 'gameConfig';
import { GAME_STATE } from '../../constants'
import GameView from './components/GameView';
import useStateWithGetter from '../../hooks/useStateWithGetter';
import { gameSoundtrack } from '../../static/music';
import {
  buttonTapSound,
  correctTileTapSound,
  wrongTileTapSound,
  pauseInSound,
  pauseOutSound,
  loseSound
} from '../../static/sfx';
import useMusic from '../../hooks/useMusic';
import useSFX from '../../hooks/useSFX';


export default function Game({ navigation }) {

  const [gameState, setGameState, getGameState] = useStateWithGetter(GAME_STATE.INGAME);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(gameConfig.initialPoints);
  const [timeLeft, setTimeLeft] = useState(gameConfig.initialTime);
  const [bestScore] = useState(0);
  const [bestTime] = useState(0);
  const [color, setColor] = useState();
  const [distinctColor, setDistinctColor] = useState();
  const [distinctTile, setDistinctTile] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    x: gameConfig.initialSizeX,
    y: gameConfig.initialSizeY
  });

  const [playMusic, stopMusic, pauseMusic] = useMusic(gameSoundtrack);

  const playButtonTapSound = useSFX(buttonTapSound);
  const playCorrectTileTapSound = useSFX(correctTileTapSound);
  const playWrongTileTapSound = useSFX(wrongTileTapSound);
  const playPauseInSound = useSFX(pauseInSound);
  const playPauseOutSound = useSFX(pauseOutSound);
  const playLoseSound = useSFX(loseSound);

  const shakeAnim = useRef(new Animated.Value(0)).current;


  const doWrongPressAnimation = () => {
    const duration = 50;
    const useNativeDriver = true;

    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 15, duration, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: -15, duration, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: 15, duration, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: -15, duration, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: 0, duration, useNativeDriver })
     ]).start();
  }

  const onTilePressed = async (x, y) => {
    const correctTile = distinctTile.x === x && distinctTile.y === y;

    let timeChange;
    let pointsChange;

    if (correctTile) {
      timeChange = gameConfig.timeIncrement;
      pointsChange = gameConfig.pointsIncrement;

      playCorrectTileTapSound()
      generateNewRound();
    } else {
      timeChange = gameConfig.timeDecrement;
      pointsChange = gameConfig.pointsDecrement;

      playWrongTileTapSound();
      doWrongPressAnimation();
    }

    setTimeLeft(Math.max(timeLeft + timeChange, 0));
    setPoints(Math.max(points + pointsChange, 0));
  }

  const onBottomBarPress = async () => {
    switch (gameState) {
      case GAME_STATE.INGAME:
        playPauseInSound();
        pauseMusic();
        setGameState(GAME_STATE.PAUSED);
        break;
      case GAME_STATE.PAUSED:
        playPauseOutSound();
        playMusic();
        setGameState(GAME_STATE.INGAME);
        break;
      case GAME_STATE.LOST:
        resetGame();
        break;
    }
  }

  const onExitPress = async () => {
    playButtonTapSound();
    stopMusic();
    navigation.goBack();
  }

  const onGameLost = async () => {
    stopMusic();
    playLoseSound();
    setGameState(GAME_STATE.LOST);
  }

  //TODO: improve this
  const resetGame = async () => {
    setPoints(gameConfig.initialPoints);
    setTimeLeft(gameConfig.initialTime);
    setGameState(GAME_STATE.INGAME);

    playMusic();

    generateNewRound(gameConfig.initialPoints);
  }

  const randomTile = (sizeX, sizeY) => ({
    x: randomInt(0, sizeX),
    y: randomInt(0, sizeY)
  })

  const generateSize = (currPoints, min = 2, max = 5) => {
    const size = Math.min(Math.max(Math.floor(Math.sqrt(currPoints)), min), max);

    return { x: size, y: size };
  }

  const generateNewRound = (currentPoints = points)  => {
    try {
      setLoading(true);

      const { minTileSize, maxTileSize } = gameConfig;
      const rgb = generateRGB();
      const mutatedRgb = mutateRGB(rgb, 10, 100);
      const size = generateSize(currentPoints, minTileSize, maxTileSize);

      setColor(rgb);
      setSize(size);
      setDistinctColor(mutatedRgb);
      setDistinctTile(randomTile(size.x, size.y));

    } finally {
      setLoading(false);
    }
  }

  const countTime = () => {
    getGameState(gameState => {
      setTimeLeft(timeLeft => {
        if (gameState !== GAME_STATE.INGAME) {
          return timeLeft;
        }
        if (timeLeft <= 0) {
          onGameLost();
          return timeLeft;
        }
        return Math.max(timeLeft - 1, 0)
      });
    })
  }


  useEffect(() => {
    generateNewRound();

    const interval = setInterval(countTime, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);


  return (
    <GameView
      gameState={gameState}
      size={size}
      color={color}
      loading={loading}
      points={points}
      timeLeft={timeLeft}
      bestScore={bestScore}
      bestTime={bestTime}
      distinctTile={distinctTile}
      distinctColor={distinctColor}
      wrongTilePressedAnimation={shakeAnim}
      onTilePressed={onTilePressed}
      onBottomBarPress={onBottomBarPress}
      onExitPress={onExitPress}
    />
  );
}
