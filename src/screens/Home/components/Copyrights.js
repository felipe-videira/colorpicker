
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/copyrights';
import { arrayOf, shape, string } from 'prop-types';

export default function Copyrights({ data }) {
  return (
    <View style={styles.copyrightsContainer} >
      {data.map((item, index) => (
        <Text
          key={index}
          style={[styles.copyrightsText, { color: item.displayColor }]}
        >
          {`${item.copyright}: ${item.owner}`}
        </Text>
      ))}
    </View>
  );
}

Copyrights.propTypes = {
  data: arrayOf(shape({
    copyright: string.isRequired,
    owner: string.isRequired,
    displayColor: string.isRequired,
  })).isRequired,
}
