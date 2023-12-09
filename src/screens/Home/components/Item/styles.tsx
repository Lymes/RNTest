import {StyleSheet} from 'react-native';
import {ThemeContextData} from '~themes/ThemeProvider';

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    itemWrapper: {
      width: '100%',
    },
    item: {
      width: '100%',
      height: 80,
      padding: 10,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 6,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.5,
      textShadowRadius: 10,
      shadowOffset: {width: 0, height: 0},
    },
    itemText: {
      width: '100%',
      height: '100%',
      fontFamily: theme.typography.family.light,
      fontSize: theme.typography.size.medium,
      color: theme.colors.cardTint,
    },
  });
};

export default styles;
