import React from 'react';
import styles from '../styles/tiles';
import { View, TouchableOpacity, Animated } from 'react-native';
import { bool, func, exact, number, instanceOf } from 'prop-types';

export default function Tiles({
  size,
  color,
  distinctColor,
  distinctTile,
  onTilePressed,
  loading,
  wrongTilePressedAnimation,
}) {
  if (loading) return null;

  return (
    <Animated.View
      style={[
        styles.tilesContainer,
        { transform: [{
            translateX: wrongTilePressedAnimation
        }] }
      ]}
    >
      {Array(size.x).fill().map((_, x) => (
        <View style={styles.tileSlot} key={x}>
          {Array(size.y).fill().map((_, y) => {
            const { r, g, b } = distinctTile.x === x && distinctTile.y === y
              ? distinctColor
              : color;
            return (
              <TouchableOpacity
                key={`${y}.${x}`}
                style={[
                  styles.tile,
                  {
                    backgroundColor: `rgb(${r}, ${g}, ${b})`
                  }
                ]}
                onPress={() => onTilePressed(x, y)}
              />
            );
          })}
        </View>
      ))}
    </Animated.View>
  );
}

Tiles.propTypes = {
  size: exact({
    x: number.isRequired,
    y: number.isRequired,
  }),
  color: exact({
    r: number.isRequired,
    g: number.isRequired,
    b: number.isRequired,
  }),
  distinctColor: exact({
    r: number.isRequired,
    g: number.isRequired,
    b: number.isRequired,
  }),
  distinctTile: exact({
    x: number.isRequired,
    y: number.isRequired
  }),
  onTilePressed: func.isRequired,
  wrongTilePressedAnimation: instanceOf(Animated.Value),
  loading: bool,
};

Tiles.defaultProps = {
  loading: false,
};
