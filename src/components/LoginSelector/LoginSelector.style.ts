import {StyleSheet} from 'react-native';
import {ThemeContextData} from '~themes/ThemeProvider';

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    ipAddressInput: {
      alignSelf: 'center',
      fontFamily: theme.typography.family.regular,
      color: 'black',
      width: '100%',
      height: 40,
      margin: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'grey',
      elevation: 0,
      marginBottom: 30,
    },
    textContainer: {
      alignSelf: 'flex-start',
    },
    titleText: {
      alignSelf: 'flex-start',
      fontFamily: theme.typography.family.bold,
      fontSize: theme.typography.size.small,
      color: 'black',
    },
    horizontal: {
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'space-around',
      padding: 10,
    },
  });
};

export {styles};
