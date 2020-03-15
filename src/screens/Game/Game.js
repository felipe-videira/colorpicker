import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { generateRGB, mutateRGB, randomInt } from '@/utils';
import gameConfig from 'gameConfig';


export default function Game({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);
  const [points, setPoints] = useState(gameConfig.initialPoints);
  const [timeLeft, setTimeLeft] = useState(gameConfig.initialTime);
  const [size, setSize] = useState({
    x: gameConfig.initialSizeX,
    y: gameConfig.initialSizeY
  });
  const [rgb, setRgb] = useState();
  const [diffRgb, setDiffRgb] = useState();
  const [diffTile, setDiffTile] = useState({ x: 0, y: 0 });


  const onTilePressed = (x, y) => {
    const correctTile = diffTile.x === x && diffTile.y === y;
    setTimeLeft(timeLeft + (correctTile ? gameConfig.timeIncrement : gameConfig.timeDecrement));
    setPoints(points + (correctTile ? gameConfig.pointsIncrement : gameConfig.pointsDecrement));

    console.log(points);
    console.log(timeLeft);

    correctTile && newRound();
  }

  const generateTiles = (sX = 2, sY = 2, currRgb, dRgb, dTile) => {
    const getColor = ({r,g,b}) => ({
      backgroundColor: `rgb(${r}, ${g}, ${b})`
    })
    return (
      Array(sX).fill().map((_, x) => (
        <View style={styles.tileSlot} key={x}>
          {Array(sY).fill().map((_, y) => (
            <TouchableOpacity
              key={`${y}.${x}`}
              style={[styles.tile, getColor(dTile.x === x && dTile.y === y
                ? dRgb
                : currRgb)]}
              onPress={() => onTilePressed(x, y)}
            />
          ))}
        </View>
      ))
    );
  }

  const randomTile = (sizeX, sizeY) => ({
    x: randomInt(0, sizeX),
    y: randomInt(0, sizeY)
  })

  const generateSize = (currPoints, min = 2, max = 5) => {
    const size = Math.min(Math.max(Math.floor(Math.sqrt(currPoints)), min), max);
    return {
      x: size,
      y: size,
    }
  }

  const newRound = () => {
    try {
      setLoading(true);
      const { minTileSize, maxTileSize } = gameConfig;
      const rgb = generateRGB();
      const mRgb = mutateRGB(rgb, 10, 100);
      const size = generateSize(points, minTileSize, maxTileSize);
      setRgb(rgb);
      setSize(size);
      setDiffRgb(mRgb);
      setDiffTile(randomTile(size.x, size.y));
    } finally {
      setLoading(false);
    }
  }

  const countTime = () => {
    setTimeLeft(timeLeft => Math.max(timeLeft - 1, 0));
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      navigation.navigate("Home");
    }
  }, [timeLeft])

  useEffect(() => {
    newRound();

    const interval = setInterval(countTime, 1000);

    setTimeout(() => {
      setShowTutorial(false);
    }, 5000)

    return () => {
      clearInterval(interval);
    }
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.texts}>{`${points} points`}</Text>
      <Text style={styles.texts}>{`${timeLeft}s left`}</Text>
      {showTutorial && <Text style={[styles.texts, styles.tutorialText]}>{`who is different?`}</Text>}

      <View style={styles.tilesContainer}>
        {!loading && generateTiles(size.x, size.y, rgb, diffRgb, diffTile)}
      </View>
    </View>
  );
}
