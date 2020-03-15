
import React from 'react';
import copyrights from 'copyrights';
import { View, Text } from 'react-native';
import styles from '../styles/copyrights';

export default function Copyrights() {
  return (
    <View style={styles.copyrightsContainer}>
      {copyrights.map((o) => (
        <Text style={[styles.copyrightsText, { color: o.displayColor }]}>
          {`${o.copyright}: ${o.owner}`}
        </Text>
      ))}
    </View>
  );
}
