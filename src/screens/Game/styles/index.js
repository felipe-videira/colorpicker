import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },
  pausedContainer: {
    marginTop: height * 0.15,
    height: width * 0.875,
    width: width * 0.875,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pausedText: {
    fontFamily: 'mainFont',
    textAlign: 'center',
    color: '#eee',
    marginTop: 20,
    fontSize: 50,
  },
  pausedIcon: {
    width: 80,
    height: 80
  },
  exitButton: {
    marginTop: 35
  },
  exitIcon: {
    width: 120,
    height: 60
  }
});
