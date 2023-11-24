import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  settingsPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
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
