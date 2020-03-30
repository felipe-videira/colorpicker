import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';
import styles, { letterColors } from './styles';
import i18n from 'i18n-js';


export function Header({ style }) {
  const title = i18n.t('headerTitle');

  return (
    <View style={[styles.headerContainer, style]}>
      {letterColors.map((color, index) => (
        <Text style={[styles.headerText, { color }]}>
          {title[index]}
        </Text>
      ))}
      <Text style={styles.headerText}>
        {title.substr(letterColors.length, title.length)}
      </Text>
    </View>
  );
}

Header.propTypes = {
  style: ViewPropTypes.style,
};

Header.defaultProps = {
  style: null,
};
