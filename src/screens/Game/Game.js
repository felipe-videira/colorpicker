import React, { useState, useEffect } from 'react';
import { generateRGB, mutateRGB, randomInt } from '../../utils';
import gameConfig from 'gameConfig';
import { GAME_STATE } from '../../constants'
import GameView from './components/GameView';


export default function Game({ navigation }) {

  const [gameState, setGameState] = useState(GAME_STATE.INGAME);
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

  const onTilePressed = (x, y) => {
    const correctTile = distinctTile.x === x && distinctTile.y === y;

    setTimeLeft(Math.max(timeLeft + (correctTile ? gameConfig.timeIncrement : gameConfig.timeDecrement), 0));

    setPoints(points + (correctTile ? gameConfig.pointsIncrement : gameConfig.pointsDecrement));

    correctTile && generateNewRound();
  }

  const onBottomBarPress = () => {
    switch (gameState) {
      case GAME_STATE.INGAME:
        setGameState(GAME_STATE.PAUSED);
        break;
      case GAME_STATE.PAUSED:
        setGameState(GAME_STATE.INGAME);
        break;
      case GAME_STATE.LOST:
        resetGame();
        break;
    }
  }

  const onExitPress = () => {
    navigation.goBack();
  }

  const resetGame = () => {
    setPoints(gameConfig.initialPoints);

    setTimeLeft(gameConfig.initialTime);

    setGameState(GAME_STATE.INGAME);

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

  const getGameState = cb => {
    setGameState(gameState => {
      cb && typeof cb === 'function' && cb(gameState);
      return gameState;
    })
  }

  const countTime = () => {
    getGameState(gameState => {
      setTimeLeft(timeLeft => {
        if (gameState !== GAME_STATE.INGAME) {
          return timeLeft;
        }
        if (timeLeft <= 0) {
          setGameState(GAME_STATE.LOST);
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
      onTilePressed={onTilePressed}
      onBottomBarPress={onBottomBarPress}
      onExitPress={onExitPress}
    />
  );
}
