import {StyleSheet} from 'react-native';
import {ThemeContextData} from '~themes/ThemeProvider';

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    settingsPage: {
      flex: 1,
      alignItems: 'stretch',
      width: '80%',
      alignSelf: 'center',
      backgroundColor: theme.colors.background,
    },
    ssidLabel: {
      marginTop: 30,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      fontFamily: theme.typography.family,
      color: theme.colors.primary,
      fontSize: theme.typography.size.medium,
      height: 40,
    },
    credentialsInput: {
      alignSelf: 'center',
      fontFamily: theme.typography.family,
      justifyContent: 'center',
      width: '100%',
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'grey',
    },
    sendButton: {
      alignSelf: 'center',
      backgroundColor: theme.colors.primaryBackground,
      color: theme.colors.background,
      borderRadius: 8,
      fontFamily: theme.typography.family,
      fontSize: theme.typography.size.small,
      width: '100%',
      height: 40,
      marginTop: 30,
    },
    scanContainer: {
      alignSelf: 'center',
      margin: 20,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'flex-start',
      gap: 10,
      padding: 10,
      width: '100%',
    },
    scanLabel: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
      fontFamily: theme.typography.family,
      color: theme.colors.primary,
      fontSize: theme.typography.size.medium,
      height: 40,
    },
    scanIndicator: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
    },
    logContainer: {
      height: 300,
      borderRadius: 8,
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      padding: 10,
    },
    logText: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family,
    },
  });
};

export {styles};
