import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  settingsPage: {
    marginTop: 80,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  topRightButton: {
    alignSelf: 'flex-end',
    margin: 20,
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
    fontFamily: 'DINPro',
  },
  button: {
    marginTop: 40,
  },
  input: {
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    height: 40,
    minHeight: 40,
    width: '100%',
    marginBottom: 20,
    padding: 10,
  },
  textContainer: {
    alignSelf: 'flex-start',
  },
  titleText: {
    alignSelf: 'flex-start',
    fontFamily: 'DINPro',
    fontSize: 16,
  },
  horizontal: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
    padding: 10,
  },
});

export {styles};
