import React from 'react';
import {
  Text, TouchableOpacity, Image, ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export function Button({
  icon,
  text,
  onPress,
  style,
  iconSize,
  iconStyle
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {icon && (
      <Image
        source={icon}
        style={[styles.buttonIcon, iconStyle
          ? iconStyle
          : { height: iconSize, width: iconSize }
        ]}
      />
      )}
      {text && <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  icon: PropTypes.number,
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  iconSize: PropTypes.number,
  iconStyle: ViewPropTypes.style,
};

Button.defaultProps = {
  icon: null,
  text: null,
  style: null,
  iconSize: 60,
  iconStyle: null
};
