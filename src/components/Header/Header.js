import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

function Header({ style }) {
  return (
    <View style={[styles.headerContainer, style]}>
      <Text style={[styles.headerText, { color: '#E64C3C' }]}>c</Text>
      <Text style={[styles.headerText, { color: '#E57E31' }]}>o</Text>
      <Text style={[styles.headerText, { color: '#F1C431' }]}>l</Text>
      <Text style={[styles.headerText, { color: '#68CC73' }]}>o</Text>
      <Text style={[styles.headerText, { color: '#3998DB' }]}>r</Text>
      <Text style={styles.headerText}>blinder</Text>
    </View>
  );
}

Header.propTypes = {
  style: ViewPropTypes.style,
};

Header.defaultProps = {
  style: null,
};

export default Header;
