import React from 'react';
import {
  Text, TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

function Button({
  icon, text, onPress, style, iconSize,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {icon && (
      <Image
        source={icon}
        style={[styles.buttonIcon, { height: iconSize, width: iconSize }]}
      />
      )}
      {text && <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf(StyleSheet),
  iconSize: PropTypes.number,
};

Button.defaultProps = {
  icon: null,
  text: null,
  style: null,
  iconSize: 60,
};

export default Button;
