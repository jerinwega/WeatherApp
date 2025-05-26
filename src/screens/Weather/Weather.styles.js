import { Dimensions, StyleSheet } from 'react-native';
import { WHITE_COLOR } from '../../utils/constants'; // adjust path if needed

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
  searchContainer: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  searchContainerVisible: {
    backgroundColor: WHITE_COLOR,
  },
  searchContainerHidden: {
    backgroundColor: 'transparent',
  },
});

export default styles;
