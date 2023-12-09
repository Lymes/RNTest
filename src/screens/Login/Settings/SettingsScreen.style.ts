import {StyleSheet} from 'react-native';
import {ThemeContextData} from '~themes/ThemeProvider';

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    settingsPage: {
      marginTop: 80,
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      width: '100%',
    },
    settingsColumn: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      width: '60%',
      alignSelf: 'center',
    },
    radioGroup: {
      alignItems: 'flex-start',
      gap: 5,
    },
    applyButton: {
      alignSelf: 'center',
      backgroundColor: theme.colors.primaryBackground,
      color: theme.colors.primaryForeground,
      borderRadius: 8,
      fontFamily: theme.typography.family.bold,
      fontSize: theme.typography.size.small,
      width: '100%',
      height: 40,
      marginTop: 30,
    },
  });
};

export {styles};
