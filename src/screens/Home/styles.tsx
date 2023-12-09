import {StyleSheet} from 'react-native';
import {ThemeContextData} from '~themes/ThemeProvider';

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
    },
    wrapper: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: theme.colors.background,
    },
    bg: {
      overflow: 'visible',
      backgroundColor: theme.colors.background,
    },
    btn: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 100,
      margin: 10,
      height: 50,
      padding: 0,
      borderRadius: 25,
      backgroundColor: theme.colors.primaryBackground,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    text: {
      fontSize: theme.typography.size.medium,
      fontFamily: theme.typography.family,
      fontWeight: '900',
      color: 'white',
    },
    contentContainer: {
      justifyContent: 'flex-start',
    },
    itemContainer: {
      padding: 10,
    },
  });
};

export default styles;
