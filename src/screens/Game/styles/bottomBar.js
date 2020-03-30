import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  bottomContainer: {
    marginTop: 25,
    width: width * 0.875,
    flexDirection: 'row'
  },
  bottomSectionContainer: {
    flex: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  counterCount: {
    fontFamily: 'mainFont',
    textAlign: 'center',
    color: '#eee',
    fontSize: 30
  },
  counterLabel: {
    fontFamily: 'mainFont',
    textAlign: 'center',
    color: '#bbb',
    fontSize: 20
  },
  bestContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bestIcon: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  bestLabel: {
    fontFamily: 'mainFont',
    color: '#bbb',
    fontSize: 25,
    marginTop: 2.5,
  }
});
