import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { generateRGB, mutateRGB, randomInt } from '@/utils';

export default function Game() {

  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [size, setSize] = useState({ x: 2, y: 2 });
  const [rgb, setRgb] = useState();
  const [diffRgb, setDiffRgb] = useState();
  const [diffTile, setDiffTile] = useState({ x: 0, y: 0 });

  let interval;


  const onTilePressed = (x, y) => {
    console.log(x, y);
    console.log(diffTile.x, diffTile.y);
    diffTile.x === x && diffTile.y === y && newRound();
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
      const rgb = generateRGB();
      const mRgb = mutateRGB(rgb, 10, 100);
      const size = generateSize(points);
      setRgb(rgb);
      setSize(size);
      setDiffRgb(mRgb);
      setDiffTile(randomTile(size.x, size.y));
    } finally {
      setLoading(false);
    }
  }

  const initTimer = () => {
    interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000)
  }

  const clearTimer = () => {
    clearInterval(interval);
  }


  useEffect(() => {
    newRound();
    initTimer();

    return () => {
      clearTimer();
    }
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.tilesContainer}>
        {!loading && generateTiles(size.x, size.y, rgb, diffRgb, diffTile)}
      </View>
    </View>
  );
}
