import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },
  tilesContainer: {
    height: width * 0.875,
    width: width * 0.875,
    flexDirection: 'row'
  },
  tileSlot: {
    flex: 1,
    flexDirection: 'column'
  },
  tile: {
    flex: 1,
    margin: 2
  }
});
