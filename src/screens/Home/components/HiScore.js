
import React from 'react';
import { scoreIcon } from '../../../static/icons';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/hiScore';
import i18n from 'i18n-js';

export default function HiScore({ value }) {
  return (
    <View style={styles.hiScoreContainer}>
      <Image
        source={scoreIcon}
        style={styles.hiScoreIcon}
      />
      <Text style={styles.hiScoreText}>{`${i18n.t('hiScoreLabel')} ${value}`}</Text>
    </View>
  );
}

HiScore.propTypes = {
  value: PropTypes.number,
};

HiScore.defaultProps = {
  value: 0,
};
