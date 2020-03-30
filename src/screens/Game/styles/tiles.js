import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  tilesContainer: {
    marginTop: height * 0.15,
    height: width * 0.875,
    width: width * 0.875,
    flexDirection: 'row',
  },
  tileSlot: {
    flex: 1,
    flexDirection: 'column'
  },
  tile: {
    flex: 1,
    margin: 2
  },
});
