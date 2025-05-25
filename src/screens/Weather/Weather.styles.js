import { Dimensions, StyleSheet } from 'react-native';

const { height: deviceHeight } = Dimensions.get('window');
const { width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: deviceHeight,
    width: deviceWidth,
    zIndex: -1, // ensures it's behind everything
  },
});

export default styles;
