import {StyleSheet} from 'react-native';
import {ThemeContextData} from '~themes/ThemeProvider';

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    loginPage: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family.bold,
      fontSize: theme.typography.size.huge,
      alignSelf: 'center',
      margin: 40,
    },
    topRightButton: {
      alignSelf: 'flex-end',
      marginRight: 40,
      borderRadius: 8,
      padding: 5,
      backgroundColor: theme.colors.primaryBackground,
      tintColor: theme.colors.primaryForeground,
      width: 22,
      height: 22,
    },
    credentialsInput: {
      alignSelf: 'center',
      fontFamily: theme.typography.family.regular,
      width: '80%',
      height: 40,
      margin: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
    },
    loginButton: {
      alignSelf: 'center',
      backgroundColor: theme.colors.primaryBackground,
      color: theme.colors.primaryForeground,
      borderRadius: 8,
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
      width: '80%',
      height: 40,
      margin: 10,
    },
    settingsButton: {
      alignSelf: 'center',
      backgroundColor: theme.colors.secondaryBackground,
      color: theme.colors.primaryForeground,
      borderRadius: 8,
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
      width: '80%',
      height: 40,
      margin: 10,
    },
    settingsContainer: {
      flex: 1,
    },
  });
};

export {styles};
