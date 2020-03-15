
import React from 'react';
import { scoreIcon } from '@/assets/icons';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/hiScore';

function HiScore({ value }) {
  return (
    <View style={styles.hiScoreContainer}>
      <Image
        source={scoreIcon}
        style={styles.hiScoreIcon}
      />
      <Text style={styles.hiScoreText}>{`Hi-score: ${value}`}</Text>
    </View>
  );
}

HiScore.propTypes = {
  value: PropTypes.number,
};

HiScore.defaultProps = {
  value: 0,
};

export default HiScore;
