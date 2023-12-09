import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
  radioLabels: {
    fontFamily: 'SF-Pro-Text-Regular',
    color: 'black',
  },
  applyButton: {
    alignSelf: 'center',
    backgroundColor: '#3275df',
    color: 'white',
    borderRadius: 8,
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 16,
    width: '100%',
    height: 40,
    marginTop: 30,
  },
});

export {styles};
